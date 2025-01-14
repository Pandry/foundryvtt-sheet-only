import {showPatreonDialog, wipDialog} from "./dialogs.js"
import {initDragListener, wasDragged} from "./drag.js";
import {toggleFullscreen} from "./fullscreen.js";
import {sheetOnlyPlusActive} from "./compatibility.js";

export function addControlButtons(sheetContainer, increaseZoom, decreaseZoom, resetZoom) {
    const uiElement = $(`<div class="button-container"></div>`);

    uiElement.load("modules/sheet-only/templates/buttons.html", function () {
        const collapseButton = uiElement.find("#so-collapse-actor-select")
        const chatButton = uiElement.find("#so-toggle-chat")
        const increaseButton = uiElement.find("#so-increase-font");
        const decreaseButton = uiElement.find("#so-decrease-font");
        const resetButton = uiElement.find("#so-reset-font");
        const logoutButton = uiElement.find("#so-log-out");
        const targetingButton = uiElement.find("#so-targeting");
        const controllingButton = uiElement.find("#so-controlling");
        const settingsButton = uiElement.find("#so-fvtt-settings");
        const menuButton = uiElement.find("#so-menu");
        const fullscreen = uiElement.find("#so-fullscreen");

        collapseButton.on("click", function () {
            if (wasDragged()) return;

            toggleActorList();
        });

        chatButton.on("click", function () {
            if (wasDragged()) return;
            toggleChat();
        });

        increaseButton.on("click", function () {
            if (wasDragged()) return;
            increaseZoom();
        });

        decreaseButton.on("click", function () {
            if (wasDragged()) return;
            decreaseZoom();
        });

        resetButton.on("click", function () {
            if (wasDragged()) return;
            resetZoom()
        });

        logoutButton.on("click", function () {
            if (wasDragged()) return;
            ui.menu.items.logout.onClick();
        });

        settingsButton.on("click", function () {
            if (wasDragged()) return;
            game.settings.sheet.render(true);
        })

        targetingButton.on("click", function () {
            if (wasDragged()) return;
            if (sheetOnlyPlusActive()) {
                game.modules.get('sheet-only-plus').api.openTargeting();
            } else {
                showPatreonDialog("Targeting");
            }
        });

        controllingButton.on("click", function () {
            if (wasDragged()) return;
            wipDialog("Movement", "It will let you move your tokens.");

            // if (window.sheetOnlyPlus && typeof window.sheetOnlyPlus.openControls === "function") {
            //     window.sheetOnlyPlus.openControls();
            // } else {
            //    showPatreonDialog("Movement");
            // }
        });

        menuButton.on("click", function () {
            if (wasDragged()) return;
            toggleMenu();
        });

        fullscreen.on("click", function () {
            if (wasDragged()) return;
            toggleFullscreen();
        });
    });

    sheetContainer.append(uiElement);

    setupDefaults();
    initDragListener();
}

function setupDefaults() {
    $('#collapse-actor-select i').addClass('hidden');
    $('.sheet-only-actor-list').addClass('collapse');
}

export function toggleActorList() {
    $('#collapse-actor-select i').toggleClass('hidden');

    $('.sheet-only-actor-list').toggleClass('collapse');
    if ($('.sheet-only-actor-list.collapse')) {
        localStorage.setItem("collapsed-actor-select", "true");
    } else {
        localStorage.setItem("collapsed-actor-select", "false");
    }
}

function toggleChat() {
    $('.sheet-only-chat').toggleClass('collapse');

    if ($('.sheet-only-chat.collapse')) {
        localStorage.setItem("collapsed-chat", "true");
    } else {
        localStorage.setItem("collapsed-chat", "false");
    }
}

function toggleMenu() {
    $('#so-main-buttons').toggle();
    $('#so-settings-buttons').toggle();
}

