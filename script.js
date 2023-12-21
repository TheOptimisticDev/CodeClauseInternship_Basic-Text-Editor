document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('button');
    const fullscreenToggle = document.getElementById('fullscreenToggle');
    const textEditorMain = document.querySelector('.text-editor-main');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            let myEvent = button.dataset['command'];

            if (myEvent === "insertImage" || myEvent === "createLink") {
                let url = prompt("Enter your Link Here: ");
                document.execCommand(myEvent, false, url);
            } else if (myEvent === "formatBlock") {
                let formattingValue = button.dataset['block'];
                document.execCommand(myEvent, false, formattingValue);
            } else if (myEvent === "saveFile") {
                saveToFile();
            } else {
                document.execCommand(myEvent, false, null);
            }
        });
    });

    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');

    burgerMenu.addEventListener('click', function () {
        navLinks.classList.toggle('show');
    });

    fullscreenToggle.addEventListener('click', function () {
        toggleFullScreen();
    });

    function toggleFullScreen() {
        if (!document.fullscreenElement) {
            textEditorMain.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message}`);
            });
            fullscreenToggle.innerHTML = '<i class="fas fa-compress"></i>';
        } else {
            document.exitFullscreen();
            fullscreenToggle.innerHTML = '<i class="fas fa-expand"></i>';
        }
    }

    function saveToFile() {
        const textarea = document.createElement("textarea");
        textarea.style.display = "hidden";
        document.body.appendChild(textarea);

        textarea.value = document.querySelector('.contentOutput').innerText;

        textarea.focus();

        const userInput = prompt("Enter the content for the file:");

        const fileContent = userInput !== null ? userInput : textarea.value;

        document.body.removeChild(textarea);

        const blob = new Blob([fileContent], { type: "text/plain" });

        const link = document.createElement("a");

        link.download = "saved-file.txt";
        link.href = URL.createObjectURL(blob);

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
    }
});
