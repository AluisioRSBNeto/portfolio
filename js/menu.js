
window.addEventListener("scroll", function(){
    let header = document.querySelector('#header')
    header.classList.toggle('rolagem', window.scrollY > 0)
})

document.getElementById("contatoForm").addEventListener("submit", async function(e) {
    e.preventDefault(); // NÃO deixa recarregar a página

    const btn = document.getElementById("btnEnviar");
    const sucesso = document.getElementById("msg-sucesso");
    const erro = document.getElementById("msg-erro");

    btn.classList.add("loading");

    const url = "https://formsubmit.co/ajax/aluisiowebsites@gmail.com";

    const formData = new FormData(this);

    try {
        const resposta = await fetch(url, {
            method: "POST",
            body: formData
        });

        if (resposta.ok) {
            sucesso.style.display = "block";
            erro.style.display = "none";
            this.reset();
        } else {
            sucesso.style.display = "none";
            erro.style.display = "block";
        }

    } catch (e) {
        sucesso.style.display = "none";
        erro.style.display = "block";
    }

    btn.classList.remove("loading");
});