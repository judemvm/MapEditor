class UI {

	constructor() {
		this.RegisterEvents()
		this.Initialize()
		this.dialogs = this.InitializeDialogs()
	}

	// Maybe this isn't the way it's supposed to be done...
	Initialize() {
		$("#menubar").menu({
			position: {
				at: "left bottom"
			},
			items: "> :not(.ui-widget-seperator)"
		});

		$('#worldView').selectmenu({
			change: this.worldViewChanged
		});

		$('#tools').find('input').checkboxradio({
			icon: false
		}).on("change", this.toolsChanged);

		$('#worldSpace').find('input').checkboxradio({
			icon: false
		}).on("change", this.worldChanged);


		$('.scrollbar-outer').scrollbar();

		$('.window').each(function() {
			$(this).resizable({
				handles: "n, e, s, w, ne, se, sw, nw",
				minHeight: 200,
				minWidth: 200,
				containment: "#page",
				alsoResize: $(this).find('.scroll-wrapper'),
			});

			$(this).draggable({
				handle: $(this).find('.header'),
				containment: "#page"
			})

		});

	}

	RegisterEvents() {
		function toolsChanged(e) {
			SetGizmoMode(e.target.id);
		}

		function worldChanged(e) {
			SetWorldSpace(e.target.id);
		}

		function worldViewChanged(e, ui) {
			SendEvent('DispatchEventLocal', 'MapEditor:SetViewmode', ui.item.value)
		}
	}

	InitializeDialogs() {
		let dialogs = {}
		dialogs["variation"] = $("#variation-dialog").dialog({
			autoOpen: false,
			height: "auto",
			width: "auto",
			modal: true,
			buttons: {
				"Spawn object!": ConfirmInstanceSpawn,
				Cancel: function() {
					dialogs["variation"].dialog("close");
				}
			},
			close: function() {
				dialogs["variation"].dialog("close");
			}
		});

		return dialogs;
	}
}