document.addEventListener("DOMContentLoaded", () => {

    // =====================================================
    // ELEMENTOS
    // =====================================================

    const createButton = document.getElementById("createList");
    const modal = document.getElementById("listModal");
    const closeModal = document.getElementById("closeModal");
    const saveList = document.getElementById("saveList");

    const listName = document.getElementById("listName");
    const listDescription = document.getElementById("listDescription");

    const searchInput = document.getElementById("searchInput");

    // Buscamos el contenedor donde están las tarjetas
    const feed = document.querySelector(".feed");


    // =====================================================
    // ABRIR MODAL
    // =====================================================

    if (createButton && modal) {

        createButton.addEventListener("click", () => {
            modal.classList.remove("hidden");

            // Enfocar automáticamente el nombre
            if (listName) {
                setTimeout(() => listName.focus(), 100);
            }
        });

    }


    // =====================================================
    // CERRAR MODAL
    // =====================================================

    if (closeModal && modal) {

        closeModal.addEventListener("click", () => {
            modal.classList.add("hidden");
        });

    }


    // =====================================================
    // CERRAR HACIENDO CLICK FUERA
    // =====================================================

    if (modal) {

        modal.addEventListener("click", (event) => {

            if (event.target === modal) {
                modal.classList.add("hidden");
            }

        });

    }


    // =====================================================
    // CERRAR CON ESC
    // =====================================================

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape" && modal) {
            modal.classList.add("hidden");
        }

    });


    // =====================================================
    // CREAR LISTA
    // =====================================================

    if (saveList) {

        saveList.addEventListener("click", () => {

            const name = listName.value.trim();
            const description = listDescription.value.trim();

            // Validación
            if (name === "") {
                alert("Ponle un nombre a tu lista.");
                listName.focus();
                return;
            }


            // Crear tarjeta
            const card = document.createElement("article");

            card.className = "list-card";


            // HTML de la nueva tarjeta
            card.innerHTML = `
                
                <div class="card-user">

                    <div class="avatar small">
                        Tú
                    </div>

                    <div>
                        <strong>Tu lista</strong>
                        <span>Ahora</span>
                    </div>

                </div>


                <h2>${escapeHTML(name)}</h2>


                <p class="description">
                    ${escapeHTML(description || "Sin descripción.")}
                </p>


                <div class="products">

                    <div class="product">
                        📋
                        <span>Lista</span>
                    </div>

                    <div class="product">
                        ✨
                        <span>Nueva</span>
                    </div>

                    <div class="product">
                        👤
                        <span>Personal</span>
                    </div>

                    <div class="product">
                        📝
                        <span>0 items</span>
                    </div>

                </div>


                <div class="rating">
                    ★ 0
                    <span> | Recién creada</span>
                </div>


                <div class="card-actions">

                    <button
                        class="like-button"
                        type="button"
                        aria-label="Dar me gusta"
                    >
                        ♡ <span>0</span>
                    </button>

                    <button
                        type="button"
                        class="comment-button"
                    >
                        💬 Comentar
                    </button>

                    <button
                        type="button"
                        class="share-button"
                    >
                        ↗ Compartir
                    </button>

                </div>

            `;


            // Añadir al principio del feed
            if (feed) {

                // Si existe un header, insertamos después de él
                const header = feed.querySelector(".feed-header");

                if (header) {
                    header.insertAdjacentElement("afterend", card);
                } else {
                    feed.prepend(card);
                }

            }


            // Activar los botones de la nueva tarjeta
            setupLikeButton(
                card.querySelector(".like-button")
            );


            setupCardButtons(card);


            // Limpiar formulario
            listName.value = "";
            listDescription.value = "";


            // Cerrar modal
            modal.classList.add("hidden");


            // Mensaje
            showNotification("Lista creada correctamente ✨");

        });

    }


    // =====================================================
    // LIKES
    // =====================================================

    function setupLikeButton(button) {

        if (!button) return;

        button.addEventListener("click", () => {

            const number = button.querySelector("span");

            if (!number) return;

            let likes = parseInt(number.textContent) || 0;


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

    }


    // Activar likes de las tarjetas existentes
    document
        .querySelectorAll(".like-button")
        .forEach(button => {
            setupLikeButton(button);
        });


    // =====================================================
    // BOTONES DE LAS TARJETAS
    // =====================================================

    function setupCardButtons(card) {

        const commentButton =
            card.querySelector(".comment-button");

        const shareButton =
            card.querySelector(".share-button");


        if (commentButton) {

            commentButton.addEventListener("click", () => {

                showNotification(
                    "Los comentarios estarán disponibles próximamente 💬"
                );

            });

        }


        if (shareButton) {

            shareButton.addEventListener("click", async () => {

                const title =
                    card.querySelector("h2")?.textContent ||
                    "Mi lista";


                // API de compartir del navegador
                if (navigator.share) {

                    try {

                        await navigator.share({
                            title: title,
                            text: `Mira esta lista: ${title}`,
                            url: window.location.href
                        });

                    } catch (error) {
                        // El usuario canceló el menú de compartir
                    }

                } else {

                    // Fallback: copiar URL
                    try {

                        await navigator.clipboard.writeText(
                            window.location.href
                        );

                        showNotification(
                            "Enlace copiado al portapapeles 🔗"
                        );

                    } catch (error) {

                        showNotification(
                            "No se pudo copiar el enlace."
                        );

                    }

                }

            });

        }

    }


    // Activar botones existentes
    document
        .querySelectorAll(".list-card")
        .forEach(card => {
            setupCardButtons(card);
        });


    // =====================================================
    // BUSCADOR
    // =====================================================

    if (searchInput) {

        searchInput.addEventListener("input", () => {

            const search =
                searchInput.value
                    .toLowerCase()
                    .trim();


            const cards =
                document.querySelectorAll(".list-card");


            cards.forEach(card => {

                const text =
                    card.textContent.toLowerCase();


                if (text.includes(search)) {

                    card.style.display = "";

                } else {

                    card.style.display = "none";

                }

            });

        });

    }


    // =====================================================
    // ESCAPAR HTML
    // Evita que el usuario pueda insertar HTML
    // =====================================================

    function escapeHTML(text) {

        const div = document.createElement("div");

        div.textContent = text;

        return div.innerHTML;

    }


    // =====================================================
    // NOTIFICACIÓN
    // =====================================================

    function showNotification(message) {

        const notification =
            document.createElement("div");


        notification.textContent = message;


        notification.style.position = "fixed";
        notification.style.bottom = "25px";
        notification.style.left = "50%";
        notification.style.transform =
            "translateX(-50%)";

        notification.style.zIndex = "9999";

        notification.style.padding =
            "13px 20px";

        notification.style.borderRadius =
            "16px";

        notification.style.color =
            "#ffffff";

        notification.style.background =
            "rgba(25, 40, 65, 0.92)";

        notification.style.border =
            "1px solid rgba(150,195,255,0.2)";

        notification.style.backdropFilter =
            "blur(20px)";

        notification.style.boxShadow =
            "0 15px 40px rgba(0,0,0,0.35)";

        notification.style.fontSize =
            "14px";

        notification.style.fontWeight =
            "600";


        document.body.appendChild(notification);


        setTimeout(() => {

            notification.style.opacity = "0";

            notification.style.transition =
                "opacity 0.25s ease";

            setTimeout(() => {
                notification.remove();
            }, 250);

        }, 2200);

    }

});
