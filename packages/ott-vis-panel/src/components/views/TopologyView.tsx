import React, { useCallback, useEffect, useRef } from "react";
import * as d3 from "d3";
import type { SystemState } from "ott-vis/types";
import {
	buildFullTree,
	filterTreeGroups,
	pruneTrees,
	type BoundingBox,
	type TreeNode,
	treeBoundingBox,
	calcGoodTreeRadius,
	superBoundingBox,
	offsetBBox,
	expandBBox,
} from "treeutils";
import "./topology-view.css";
import { useColorProvider } from "colors";
import { useD3Zoom } from "chartutils";
import { dedupeItems } from "aggregate";
import { useEventBus } from "eventbus";

/**
 * The goal of this component is to show a more accurate topology view from the perspective of actual network connections.
 *
 * There will be 2 types of trees: Balancer Trees and Monolith Trees. The Balancer Trees will show the connections between Balancers and clients, while the Monolith Trees will show the connections between Monoliths and Rooms.
 *
 * These trees will be grouped by region, and the nodes will be colored by group. Balancer Trees will be on the left, and Monolith Trees will be on the right, with connections between Balancers and Monoliths, and regions being shown by boxing the trees that are in the same region.
 */

interface TopologyViewProps extends TopologyViewStyleProps {
	systemState: SystemState;
	width: number;
	height: number;
}

export interface TopologyViewStyleProps {
	baseNodeRadius: number;
	clientNodeRadius: number;
	subtreePadding: number;
}

interface Subtree {
	tree: d3.HierarchyNode<TreeNode>;
	bbox: BoundingBox;
	x: number;
	y: number;
}

interface PrebuiltRegion {
	name: string;
	balancerTrees: d3.HierarchyNode<TreeNode>[];
	monolithTrees: d3.HierarchyNode<TreeNode>[];
}

interface Region {
	name: string;
	balancerSubtrees: Subtree[];
	monolithSubtrees: Subtree[];
	bbox: BoundingBox;
}

const DEBUG_BOUNDING_BOXES = false;

export const TopologyView: React.FC<TopologyViewProps> = ({
	systemState,
	width,
	height,
	baseNodeRadius = 20,
	clientNodeRadius = 8,
	subtreePadding = 60,
}) => {
	const svgRef = useRef<SVGSVGElement | null>(null);
	const fullTree = d3
		.hierarchy(buildFullTree(systemState))
		.sort((a, b) => d3.ascending(a.data.id, b.data.id));
	const monolithTrees = dedupeItems(
		pruneTrees(fullTree, "monolith", "room"),
		tree => tree.data.id,
		(a, b) => a
	);
	const balancerTrees = filterTreeGroups(fullTree, ["balancer", "client"]);
	const colors = useColorProvider();

	const getRadius = useCallback(
		(group: string): number => {
			if (group === "client") {
				return clientNodeRadius;
			} else {
				return baseNodeRadius;
			}
		},
		[baseNodeRadius, clientNodeRadius]
	);

	useEffect(() => {
		if (!svgRef.current) {
			return;
		}

		const svg = d3.select(svgRef.current);

		const monolithRegions: Map<string, PrebuiltRegion> = new Map();
		for (const tree of monolithTrees) {
			const region = tree.data.region;
			if (!monolithRegions.has(region)) {
				monolithRegions.set(region, {
					name: region,
					balancerTrees: [],
					monolithTrees: [],
				});
			}
			monolithRegions.get(region)?.monolithTrees.push(tree);
		}
		for (const tree of balancerTrees) {
			const region = tree.data.region;
			if (!monolithRegions.has(region)) {
				monolithRegions.set(region, {
					name: region,
					balancerTrees: [],
					monolithTrees: [],
				});
			}
			monolithRegions.get(region)?.balancerTrees.push(tree);
		}

		const tr = d3.transition().duration(1000).ease(d3.easeCubicInOut);
		const diagonal = d3
			.linkRadial<any, TreeNode>()
			.angle((d: any) => Math.atan2(d.y, d.x) + Math.PI / 2)
			.radius((d: any) => Math.sqrt(d.x * d.x + d.y * d.y));
		function renderTrees(trees: Subtree[], groupClass: string) {
			svg.select(groupClass)
				.selectAll(".tree")
				.data(trees)
				.join(
					create => {
						const group = create
							.append("g")
							.attr("class", "tree")
							.attr("transform", d => `translate(${d.x}, ${d.y})`);
						group.append("g").attr("class", "links");
						group.append("g").attr("class", "nodes");
						group.append("g").attr("class", "texts");
						return group;
					},
					update => update,
					exit => exit.remove()
				)
				.transition(tr)
				.attr("transform", d => `translate(${d.x}, ${d.y})`)
				.each(function (subtree) {
					const tree = subtree.tree;
					const group = d3.select(this);
					group
						.select(".links")
						.selectAll(".link")
						.data(tree.links(), (d: any) => d.source?.data?.id + d.target?.data?.id)
						.join(
							create => create.append("path").attr("class", "link"),
							update => update,
							exit => exit.transition(tr).attr("stroke-width", 0).remove()
						)
						.attr("class", "link")
						.attr("data-nodeid-source", d => d.source.data.id)
						.attr("data-nodeid-target", d => d.target.data.id)
						.transition(tr)
						.attr("d", diagonal)
						.attr("stroke", "#fff")
						.attr("stroke-width", 1.5);

					group
						.select(".nodes")
						.selectAll(".node")
						.data(tree.descendants(), (d: any) => d.data.id)
						.join(
							create =>
								create
									.append("circle")
									.attr("class", "node")
									.attr("cx", (d: any) => (d.parent ? d.parent.x : d.x))
									.attr("cy", (d: any) => (d.parent ? d.parent.y : d.y)),
							update => update,
							exit =>
								exit
									.transition(tr)
									.attr("r", 0)
									.attr("x", (d: any) => (d.parent ? d.parent.x : d.x))
									.attr("y", (d: any) => (d.parent ? d.parent.y : d.y))
									.remove()
						)
						.attr("data-nodeid", d => d.data.id)
						.transition(tr)
						.attr("cx", (d: any) => d.x)
						.attr("cy", (d: any) => d.y)
						.attr("r", d => getRadius(d.data.group))
						.attr("fill", d => colors.assign(d.data.group))
						.attr("stroke", "#fff")
						.attr("stroke-width", 2);

					group
						.select(".texts")
						.selectAll(".text")
						.data(tree.descendants(), (d: any) => d.data.id)
						.join(
							create =>
								create
									.append("text")
									.attr("class", "text")
									.attr("x", (d: any) => (d.parent ? d.parent.x : d.x))
									.attr("y", (d: any) => (d.parent ? d.parent.y : d.y)),
							update => update,
							exit =>
								exit
									.transition(tr)
									.attr("font-size", 0)
									.attr("x", (d: any) => (d.parent ? d.parent.x : d.x))
									.attr("y", (d: any) => (d.parent ? d.parent.y : d.y))
									.remove()
						)
						.filter(d => d.data.group !== "room" && d.data.group !== "client")
						.text(d => d.data.id.substring(0, 6))
						.transition(tr)
						.attr("x", (d: any) => d.x)
						.attr("y", (d: any) => d.y)
						.attr("font-size", 10);
				});
		}

		function buildRegion(region: PrebuiltRegion): Region {
			const monolithSubtrees: Subtree[] = [];
			const balancerSubtrees: Subtree[] = [];

			let balancerYs = 0;
			for (const tree of region.balancerTrees) {
				const shouldPack = tree.leaves().length > 6;
				const radius = calcGoodTreeRadius(
					tree,
					shouldPack ? clientNodeRadius / 2 : clientNodeRadius,
					shouldPack ? 0 : 4
				);
				const layout = d3.tree<TreeNode>().size([-Math.PI, radius]);
				layout(tree);
				// precompute radial coordinates
				tree.each((node, i) => {
					if (shouldPack) {
						// @ts-expect-error d3 adds x and y to the node
						node.y -= clientNodeRadius * (i % 2) * 2;
					}
					// @ts-expect-error d3 adds x and y to the node
					const [x, y] = d3.pointRadial(node.x, node.y);
					// @ts-expect-error d3 adds x and y to the node
					node.x = x;
					// @ts-expect-error d3 adds x and y to the node
					node.y = y;
				});
				const bbox = treeBoundingBox(tree);
				balancerSubtrees.push({
					tree,
					bbox,
					x: -100,
					y: balancerYs,
				});
				const [_left, top, _right, bottom] = bbox;
				const height = bottom - top;
				balancerYs += height + subtreePadding;
			}
			let monolithYs = 0;
			for (const tree of region.monolithTrees) {
				const shouldPack = tree.leaves().length > 6;
				const radius = calcGoodTreeRadius(
					tree,
					shouldPack ? baseNodeRadius / 2 : baseNodeRadius
				);
				const layout = d3.tree<TreeNode>().size([Math.PI, radius]);
				layout(tree);
				// precompute radial coordinates
				tree.each((node, i) => {
					if (shouldPack) {
						// @ts-expect-error d3 adds x and y to the node
						node.y -= baseNodeRadius * (i % 2) * 2;
					}
					// @ts-expect-error d3 adds x and y to the node
					const [x, y] = d3.pointRadial(node.x, node.y);
					// @ts-expect-error d3 adds x and y to the node
					node.x = x;
					// @ts-expect-error d3 adds x and y to the node
					node.y = y;
				});
				const bbox = treeBoundingBox(tree);
				monolithSubtrees.push({
					tree,
					bbox,
					x: 100,
					y: monolithYs,
				});
				const [_left, top, _right, bottom] = bbox;
				const height = bottom - top;
				monolithYs += height + subtreePadding;
			}

			const built: Region = {
				name: region.name,
				balancerSubtrees,
				monolithSubtrees,
				bbox: expandBBox(
					superBoundingBox([
						...balancerSubtrees.map(t => offsetBBox(t.bbox, t.x, t.y)),
						...monolithSubtrees.map(t => offsetBBox(t.bbox, t.x, t.y)),
					]),
					200
				),
			};
			return built;
		}

		function renderRegion(region: Region) {
			const monolithSubtrees = region.monolithSubtrees;
			const balancerSubtrees = region.balancerSubtrees;

			if (DEBUG_BOUNDING_BOXES) {
				svg.select(".monolith-trees")
					.selectAll("rect")
					.data([...monolithSubtrees, ...balancerSubtrees])
					.join("rect")
					.attr("x", d => d.x + d.bbox[0])
					.attr("y", d => d.y + d.bbox[1])
					.attr("width", d => d.bbox[2] - d.bbox[0])
					.attr("height", d => d.bbox[3] - d.bbox[1])
					.attr("fill", "rgba(255, 255, 255, 0.1)")
					.attr("stroke", "white")
					.attr("stroke-width", 1);
			}

			renderTrees(balancerSubtrees, ".balancer-trees");
			renderTrees(monolithSubtrees, ".monolith-trees");

			interface B2M {
				source: Subtree;
				target: Subtree;
			}

			const b2mLinks: B2M[] = [];
			for (const balancer of balancerSubtrees) {
				for (const monolith of monolithSubtrees) {
					b2mLinks.push({ source: balancer, target: monolith });
				}
			}

			const diagonal = d3
				.link<B2M, Subtree>(d3.curveStep)
				.x((d: any) => d.x + d.tree.x)
				.y((d: any) => d.y + d.tree.y);
			svg.select(".b2m")
				.selectAll(".link")
				.data(b2mLinks, (d: any) => d.source?.tree.data.id + d.target?.tree.data.id)
				.join(
					create => create.append("path").attr("class", "link"),
					update => update,
					exit => exit.transition(tr).attr("stroke-width", 0).remove()
				)
				.attr("data-nodeid-source", d => d.source.tree.data.id)
				.attr("data-nodeid-target", d => d.target.tree.data.id)
				.transition(tr)
				.attr("d", diagonal)
				.attr("stroke-width", 1.5)
				.attr("stroke", "#fff");
		}

		const monolithBuiltRegions = new Map<string, Region>();
		for (const [name, region] of monolithRegions.entries()) {
			monolithBuiltRegions.set(name, buildRegion(region));
			renderRegion(monolithBuiltRegions.get(name)!);
		}

		svg.select(".regions")
			.selectAll(".region")
			.data(monolithBuiltRegions.values(), (d: any) => d.name)
			.join(
				create =>
					create
						.append("rect")
						.attr("class", "region")
						.attr("x", d => d.bbox[0])
						.attr("y", d => d.bbox[1])
						.attr("width", d => d.bbox[2] - d.bbox[0])
						.attr("height", d => d.bbox[3] - d.bbox[1]),
				update => update,
				exit => exit.transition(tr).attr("opacity", 0).remove()
			)
			.attr("data-nodeid", d => d.name)
			.transition(tr)
			.attr("x", d => d.bbox[0])
			.attr("y", d => d.bbox[1])
			.attr("width", d => d.bbox[2] - d.bbox[0])
			.attr("height", d => d.bbox[3] - d.bbox[1])
			.attr("opacity", 1);
	}, [
		svgRef,
		monolithTrees,
		balancerTrees,
		subtreePadding,
		colors,
		baseNodeRadius,
		clientNodeRadius,
		getRadius,
	]);

	useD3Zoom(svgRef);

	const eventBus = useEventBus();
	useEffect(() => {
		const rxColor = "#0f0";
		const txColor = "#00f";

		function animateNode(
			node: d3.Selection<any, d3.HierarchyNode<TreeNode>, any, any>,
			color: string
		) {
			if (node.empty()) {
				return;
			}
			const data = node.data()[0] as d3.HierarchyNode<TreeNode>;
			const endRadius = data ? getRadius(data.data.group) : 20;
			let radiusCurrent = parseFloat(node.attr("r"));
			let colorCurrent = d3.color(node.attr("stroke"));
			if (isNaN(radiusCurrent)) {
				radiusCurrent = 0;
			}
			const newRadius = Math.max(Math.min(radiusCurrent + 5, 40), endRadius);
			const newColor = d3.interpolateRgb(colorCurrent?.formatRgb() ?? "#fff", color)(0.5);
			node.transition("highlight")
				.duration(333)
				.ease(d3.easeCubicOut)
				.attrTween("stroke", () => d3.interpolateRgb(newColor, "#fff"))
				.attrTween("stroke-width", () => t => d3.interpolateNumber(4, 1.5)(t).toString())
				.attrTween(
					"r",
					() => t => d3.interpolateNumber(newRadius, endRadius)(t).toString()
				);
		}

		function animateLinks(
			links: d3.Selection<any, d3.HierarchyLink<TreeNode>, any, any>,
			color: string
		) {
			links
				.transition("highlight")
				.duration(333)
				.ease(d3.easeCubicOut)
				.attrTween("stroke", function () {
					const link = d3.select<d3.BaseType, d3.HierarchyLink<TreeNode>>(
						this
					) as d3.Selection<any, d3.HierarchyLink<TreeNode>, any, unknown>;
					let colorCurrent = d3.color(link.attr("stroke"));
					const newColor = d3.interpolateRgb(
						colorCurrent?.formatRgb() ?? "#fff",
						color
					)(0.5);

					return d3.interpolateRgb(newColor, "#fff");
				})
				.attrTween("stroke-width", () => t => d3.interpolateNumber(4, 1.5)(t).toString());
		}

		const sub = eventBus.subscribe(event => {
			const color = event.direction === "rx" ? rxColor : txColor;
			const node = d3.select<d3.BaseType, d3.HierarchyNode<TreeNode>>(
				`[data-nodeid="${event.node_id}"]`
			);
			animateNode(node, color);
			if (!node.empty()) {
				const parent = d3.select<d3.BaseType, d3.HierarchyNode<TreeNode>>(
					`[data-nodeid="${node.datum().parent?.data.id}"]`
				);
				animateNode(parent, color);
			}

			const links = d3.selectAll<d3.BaseType, d3.HierarchyLink<TreeNode>>(
				`[data-nodeid-target="${event.node_id}"]`
			);
			animateLinks(links, color);
		});

		return () => {
			sub.unsubscribe();
		};
	}, [eventBus, getRadius]);

	return (
		<svg
			viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}
			width={width}
			height={height}
			ref={svgRef}
		>
			<g className="chart">
				<g className="regions"></g>
				<g className="b2m links" />
				<g className="balancer-trees">g</g>
				<g className="monolith-trees"></g>
			</g>
		</svg>
	);
};
