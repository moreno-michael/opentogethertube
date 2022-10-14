export default {
	"landing": {
		hero: {
			title: "Наслаждайтесь совместным просмотром.",
			description:
				"Синхронизированный просмотр в реальном времени. Опциональная система голосования.\nТёмная тема. Регистрация не требуется. Открытый исходный код.\nНикогда ещё не было так легко смотреть видео вместе.",
			btns: {
				create: "@:nav.create.title",
				browse: "Просмотр комнат",
				source: "Просмотр исходного кода",
			},
		},
		intro: {
			title: "Удалённый просмотр с друзьями теперь стал намного проще",
			name: "OpenTogetherTube",
			text1: " - платформа для синхронизированного просмотра видео в реальном времени.\nОна проста в использовании и не требует регистрации. Просто создайте комнату, добавьте видео и\nпригласите Ваших друзей. БУМ! Вы готовы смотреть видео со своими друзьями до 3 часов ночи.",
			text2: "Оригинальный TogetherTube был любим за его простой интерфейс,\nи за то, как легко было начать смотреть видео.\nOpenTogetherTube стремится быть таким же простым, продолжая совершенствоваться.",
			text3: "На данный момент Вы можете смотреть онлайн видео со своими друзьями с Youtube, Vimeo, Dailymotion, с прямых ссылок на видео в формате .mp4, и в ближайшее время их будет",
			link: "ещё больше.",
		},
		features: {
			"title": "Основные функции",
			"syncronized-playback": {
				title: "Синхронное воспроизведение",
				text: "Нажмите одну кнопку, и видео воспроизведётся для всех\nв комнате. Проще простого.",
			},
			"permanent-rooms": {
				title: "Постоянные комнаты",
				text: "Ваша компания друзей часто возвращается сюда? Избегите хлопот\nс отправкой новой ссылки каждый раз.. Постоянные\nкомнаты получают персональный URL-адрес.",
			},
			"dark-theme": {
				title: "Тёмная тема",
				text: "Смотрите нарезки из Vine поздно ночью?\nOpenTogetherTube имеет тёмную тему,\nтак что Ваши глаза не будут испытывать дискомфорт.",
			},
			"room-permissions": {
				title: "Настройка прав",
				text: "Устали от случайных придурков, приходящих в вашу комнату и\nдобавляющих кучу громких видео к Вашему сеансу\n прослушивания Lofi Hip-Hop? Просто запретите им добавлять видео.",
			},
			"voting-system": {
				title: "Система голосования",
				text: "Не можете решить, что будете смотреть дальше? Добавьте в вашу очередь воспроизведения\nсистему голосования, и да здравствует демократия!.",
			},
			"playlist-copying": {
				title: "Копирование плейлиста",
				text: "Добавляйте целые плейлисты или каналы\nв очередь, чтобы вам не пришлось\nдобавлять каждый файл по отдельности. Это лучший\nспособ просмотра группы видео с Вашими друзьями!",
			},
		},
		support: {
			title: "Поддержать разработку",
			description1:
				"OpenTogetherTube не существовал бы без поддержки таких прекрасных людей, как Вы.",
			description2:
				"Погрузитесь в разработку поделившись вашим кодом или идеями, или выразите поддержку став спонсором. Все пожервтования идут на оплату хостинга, на разработку OpenTogetherTube, и свободу OpenTogetherTube от рекламных баннеров.",
			how: "Как Я могу помочь?",
			sponsor: "Стать спонсором",
			contribute: "Посодействовать",
		},
	},
	"footer": {
		"disclaimer": "Дисклеймер: OpenTogetherTube никак не связан с TogetherTube и Watch2Gether.",
		"made-in": "Создан в Америке",
		"thanks-to": "Особая благодарность",
		"privacy-policy": "Конфиденциальность",
		"attribution": "Авторство",
	},
	"not-found": {
		title: "Страница не найдена",
		home: "@:nav.home",
		browse: "@:landing.hero.btns.browse",
	},
	"quick-room": {
		text: "Создаём временную комнату для вас...",
	},
	"attribution": {
		"sponsorblock-text": "Использование SponsorBlock:",
	},
	"faq": {
		title: "Часто задаваемые вопросы",
		questions: [
			{
				question: "Какие типы видео могут быть добавлены?",
				answer: "Youtube, Vimeo, и Dailymotion, также могут быть добавлены прямые ссылки на видео, вроде .mp4 (иногда .webm).",
			},
			{
				question: "Вы можете добавить поддержку X?",
				answer: "Если X имеет iframe API, то да, если это возможно.",
			},
			{
				question: "Вы добавите поддержку X?",
				answer: "Может быть, зависит от запроса. Откройте тикет на Гитхабе или поддержите существующий, чтобы отразить Ваши интересы.",
			},
			{
				question: "Я хочу создать постоянную комнату с кастомным URL.",
				answer: "Вы можете создать такую кликнув на кнопку в правом верхнем углу экрана.",
			},
			{
				question:
					"Почему некоторые видео не имеют названия, или заставкки, но всё ещё могут быть проиграны?",
				answer: "Это может быть связано с тем, что сервер не может получить данную информацию из-за квот Youtube API.",
			},
			{
				question: 'Почему мне пишет "Вне квоты" когда я ищу видео на YouTube?',
				answer: "Запросы к YouTube очень дорого осуществлять, из-за этого количество запросов ограничено. Если это происходит, просто найдите видео на YouTube и скопируйте ссылку.",
			},
			{
				question: "Как работают постоянные комнаты?",
				answer: 'На данный момент, постоянные комнаты лишь имеют кастомный URL-адрес, и кто угодно может к вам подключиться. Если Вы вошли в аккаунт, вы можете стать владельцем вечной комнаты, если у неё ещё нет владельца. Комнату можно сделать приватной, и только приглашённые пользователи могут попасть в неё. Это потребует наличие аккаунта у всех приглашённых, но это предотвратит случайное попадание в вашу комнату неавторизованных пользователей. Узнать прогресс разработки приватных комнат можно здесь: <a href="https://github.com/dyc3/opentogethertube/issues/261">dyc3/opentogethertube#261</a>',
			},
		],
	},
	"nav": {
		"home": "Главная",
		"browse": "Поиск",
		"faq": "FAQ",
		"bug": "Сообщить об ошибке",
		"support": "Поддержка",
		"login": "Вход",
		"link-discord": "Ссылка на Discord",
		"logout": "Выход",
		"create": {
			"title": "Созать комнату",
			"temp": "Создать временную комнату",
			"temp-desc": "Начните совместный просмотр как можно скорее.",
			"perm": "Создать постоянную комнату",
			"perm-desc": "Отлично подходит для постоянных посетителей сайта.",
		},
	},
	"room-list": {
		"no-rooms": "В данный момент комнат нет...",
		"create": "@:nav.create.title",
		"no-description": "Нет описания.",
		"nothing-playing": "Ничего не воспроизводится.",
	},
	"room": {
		"title-temp": "Временная комната",
		"kick-me": "Кикнуть",
		"rewind": "Отмотать на 10с",
		"skip": "Пропустить 10с",
		"play-pause": "Проигрывать/Пауза",
		"next-video": "Следующее видео",
		"toggle-fullscreen": "Полноэкранный режим",
		"con-status": {
			"connecting": "Подключение...",
			"connected": "Подключено",
			"failed": "Не удалось попасть в комнату",
			"find-another": "Поищите другую комнату",
		},
		"tabs": {
			queue: "Очередь",
			add: "Добавить",
			settings: "Настройки",
		},
		"users": {
			title: "Пользователи",
			set: "Выберите себе имя",
			empty: "Кажется, здесь никого нет. Пригласите своих друзей!",
			you: "Вы",
			demote: "Понизить",
			promote: "Повысить",
		},
	},
	"privacy": {
		title: "@:footer.privacy-policy",
		text1: "Этот сайт использует cookies. Также сайт использует Google Analytics, но отслеживается лишь меньшая часть информации. Единственный вид собираемой демографической информации - страна проживания, используете ли Вы мобильное устройство, или же настольное. Собираемая информация никогда не будет связана с Вашим OTT аккаунтом или сессией. Если Вы не хотите чтобы информация собиралась, используйте AdBlock.",
		text2: "Ваш IP не зарегистрирован в логах OpenTogetherTube. IP записывается на короткий промежуток времени.\nЧаты не записываются. Любые видео, которые вы ищете, никогда не будут связаны с Вашим аккаунтом или сессией.",
		text3: "Обычное использование сайта, как создание комнаты, добавление видео, и т.д., регистрируется для мониторинга и логов. Логи не оставляются больше чем на неделю.\nСобытия в логах никак не связаны с Вашим аккаунтом или сессией..",
		text4: "Если у вас есть зарегистрированный аккаунт, Ваш email используется только для восстановления доступа к аккаунту, или для связи с Вами, если это необходимо. Email не требуется, если вы авторизуетесь через Discord. Ваш email, Ваши комнаты, и прочая Ваша информация - приватна, и никогда небудет предоставлена третьим лицам.",
		text5: {
			"text": "OpenTogetherTube использует GDPR. Если по какой-то причине вам нужна информация о Вашем аккаунте, свяжитесь со мной в",
			"link-text": "Twitter.",
		},
		text6: {
			"text1": "Сайт использует Youtube Data API, использование соответствует",
			"link-text1": "YouTube API Terms of Service",
			"text2":
				"Никакая персональная информация не отправляется в YouTube. Просмотр видео с YouTube требует от Вас соглашения с",
			"link-text2": "Условиями обслуживания Youtube",
			"text3": "и",
			"link-text3": "политикой конфиденциальности Google",
		},
	},
	"chat": {
		"title": "Чат",
		"type-here": "Напишите Ваше сообщение здесь...",
	},
	"share-invite": {
		title: "Приглашение",
		text: "Скопируйте эту ссылку, и поделитесь ей с друзьями!!",
		copied: "Скопировано!",
	},
	"video": {
		"add-explanation": "Добавить в очередь.",
		"playnow": "Проиграть сейчас",
		"playnow-explanation":
			"Проиграть это видео сейчас, переместив текущее видео на верхнюю строчку очереди.",
		"no-video": "Ничего непроигрывается.",
		"no-video-text": "Добавьте Ваше видео.",
	},
	"add-preview": {
		"add-all": "Добавить всё",
		"placeholder":
			"Воспользуйтесь поиском YouTube здесь, или вставьте URL видео, чтобы добавить его в очередь",
		"title": "Что я могу добавить?",
		"single-videos": "Видео",
		"playlists": "Плейлисты",
		"playlist": "Плейлист",
		"text": "Печатайте, чтобы воспользоваться поиском YouTube.",
		"search": "Поиск",
		"search-for": 'Ищите в YouTube "{search}" нажав Enter, или тыкнув на Поиск.',
		"platforms": {
			"youtube-videos": "YouTube видео: {url}",
			"vimeo-videos": "Vimeo видео: {url}",
			"dailymotion-videos": "Dailymotion видео: {url}",
			"any-mp4-videos": "Общедоступные .mp4 видео: {url}",
			"youtube-playlists": "YouTube плейлисты: {url}",
			"youtube-channels": "YouTube каналы: {url}",
			"subreddits": "Сабреддиты: {url}",
		},
		"messages": {
			"unknown-status": "Unknown status for add preview response: {status}.",
			"unknown-error": "An unknown error occurred when getting add preview. Try again later.",
			"failed-to-get-add-preview":
				"Failed to get add preview. This is probably a bug, check console for details.",
			"failed-to-all-videos": "Failed to all videos: {message}",
		},
	},
	"processed-text": {
		"link-hint": "Нажмите, чтобы скопировать эту ссылку в вкладку добавления.",
	},
	"video-queue": {
		"no-videos": "Очередь пуста.",
		"add-video": "Добавить видео",
	},
	"video-queue-item": {
		"experimental": "Эта функция в стадии тестирования... Может сломаться!",
		"play-next": "Следующее",
		"play-last": "Предыдущее",
		"add": "Добавить",
		"remove": "Удалить",
		"messages": {
			"video-added": "Видео добавлено",
			"video-removed": "Видео удалено",
		},
		"start-at": "Воспроизведено на {timestamp}",
	},
	"room-settings": {
		"title": "@:create-room-form.title",
		"description": "@:create-room-form.description",
		"visibility": "@:create-room-form.visibility",
		"public": "@:create-room-form.public",
		"unlisted": "@:create-room-form.unlisted",
		"queue-mode": "@:create-room-form.queue-mode",
		"manual": "@:create-room-form.manual",
		"manual-hint":
			"Нормальное поведение по умолчанию, работает так, как вы это ожидаете. Вы можете вручную изменить порядок элементов в очереди.",
		"vote": "@:create-room-form.vote",
		"vote-hint": "Следующим воспроизводится видео с наибольшим количеством голосов.",
		"loop": "Повтор",
		"loop-hint": "Когда видео закончится, переместить его в конец очереди.",
		"dj": "DJ",
		"dj-hint":
			"Когда видео закончится, начните его просмотр с самого начала. Подходит для зацикливания фоновой музыки.",
		"auto-skip-text":
			"Автоматический пропуск спонсируемых сегментов, заставок, саморекламы с использованием данных SponsorBlock.",
		"permissions-not-available": "Настройки разрешений недоступны во временных комнатах.",
		"room-needs-owner":
			"Этой комнате нужен владелец, прежде чем можно будет изменить разрешения.",
		"login-to-claim": "Авторизуйтесь, чтобы стать владельцем этой комнаты.",
		"arent-able-to-modify-permissions": "Вы не можете изменять разрешения в этой комнате.",
		"settings-applied": "Настройки применены",
		"now-own-the-room": "Теперь комната {room} принадлежит Вам.",
	},
	"create-room-form": {
		"card-title": "Создать Постоянную комнату",
		"create-room": "Создать Комнату",
		"name": "Имя",
		"name-hint": "Используется как URL комнаты. Не может быть изменено позже.",
		"title": "Заголовок",
		"title-hint": "Необязательно",
		"description": "Описание",
		"description-hint": "@:create-room-form.title-hint",
		"visibility": "Видимость",
		"visibility-hint": "Определяет, отображается ли комната в списке комнат или нет.",
		"queue-mode": "Режим очереди",
		"manual": "Вручную",
		"vote": "Голосование",
		"public": "Публичная",
		"unlisted": "Скрытая",
		"rules": {
			"name": {
				"name-required": "Имя обязательно",
				"no-spaces": "Имя не должно содержать пробелов.",
				"length": "Имя должно содержать от 3 до 32 символов",
				"alphanumeric":
					"Имя должно содержать только латинские буквы, цифры, тире и подчеркивания",
				"taken": "Имя занято",
			},
			"invalid-visibility": "Недопустимая видимость",
			"invalid-queue": "Недопустимый режим очереди",
		},
		"unknown-error": "An unknown error occurred. Try again later.",
	},
	"login-form": {
		"login": "@:nav.login",
		"register": "Регистрация",
		"login-discord": "Войти через Discord",
		"email": "E-mail",
		"username": "Имя пользователя",
		"password": "Пароль",
		"retype-password": "Повторите пароль",
		"rules": {
			"email-required": "Обязательное поле",
			"valid-email": "E-mail должен быть настоящим!",
			"username-required": "Обязательное поле",
			"username-length": "Имя пользователя должно содержать от 1 до {length} символов",
			"password-required": "Обязательное поле",
			"password-length": "Длина пароля должна составлять не менее 10 символов",
			"retype-password": "Повторно введите свой пароль",
			"passwords-match": "Пароли должны совпадать",
		},
		"errors": {
			"something-weird-happened":
				"Something weird happened, but you might be logged in? Refresh the page.",
			"login-failed-noserver":
				"Failed to log in, but the server didn't say why. Report this as a bug.",
			"login-failed": "Failed to log in, and I don't know why. Report this as a bug.",
			"register-failed-noserver":
				"Failed to register, but the server didn't say why. Report this as a bug.",
			"register-failed":
				"Failed to register, and I don't know why. Check the console and report this as a bug.",
			"in-use": "Already in use.",
		},
	},
	"permissions-editor": {
		"title": "Настройка разрешений",
		"text1":
			"Все разрешения, предоставленные менее привилегированным пользователям, автоматически предоставляются более привилегированным пользователям.",
		"text2":
			"Администраторам предоставляется все. Владелец комнаты автоматически становится администратором и не может быть понижен в должности.",
		"viewing-as": "Просмотреть как",
		"permission": "Разрешение",
	},
	"actions": {
		"cancel": "Отмена",
		"close-all": "Закрыть всё",
		"undo": "Отменить действие",
		"save": "Сохранить",
	},
	"client-settings": {
		title: "Предпочтения",
		description: "Эти настройки сохраняются в вашем браузере и влияют только на вас.",
		activator: "@:client-settings.title",
	},
};
