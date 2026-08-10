<script src="script.js"></script>
</body>
// =========================
// MODAL CREAR LISTA
// =========================

const createButton = document.getElementById("createList");
const modal = document.getElementById("listModal");
const closeModal = document.getElementById("closeModal");
const saveList = document.getElementById("saveList");


// Abrir modal
createButton.addEventListener("click", () => {
    modal.classList.remove("hidden");
});


// Cerrar modal
closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
});


// Cerrar haciendo clic fuera
modal.addEventListener("click", (event) => {

    if (event.target === modal) {
        modal.classList.add("hidden");
    }

});


// Crear lista
saveList.addEventListener("click", () => {

    const name = document.getElementById("listName").value;
    const description = document.getElementById("listDescription").value;

    if (name.trim() === "") {
        alert("Ponle un nombre a tu lista.");
        return;
    }

    alert(
        "Lista creada:\n\n" +
        name +
        "\n\n" +
        description
    );

    document.getElementById("listName").value = "";
    document.getElementById("listDescription").value = "";

    modal.classList.add("hidden");

});


// =========================
// LIKES
// =========================

const likeButtons = document.querySelectorAll(".like-button");

likeButtons.forEach(button => {

    button.addEventListener("click", () => {

        const number = button.querySelector("span");

        let likes = parseInt(number.textContent);

        if (button.classList.contains("liked")) {

            likes--;

            button.classList.remove("liked");

            button.firstChild.textContent = "♡ ";

        } else {

            likes++;

            button.classList.add("liked");

            button.firstChild.textContent = "♥ ";

        }

        number.textContent = likes;

    });

});


// =========================
// BUSCADOR
// =========================

const searchInput = document.getElementById("searchInput");
const cards = document.querySelectorAll(".list-card");

searchInput.addEventListener("input", () => {

    const search = searchInput.value.toLowerCase();

    cards.forEach(card => {

        const text = card.textContent.toLowerCase();

        if (text.includes(search)) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

});
