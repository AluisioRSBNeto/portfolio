(function(){
// --- CONFIGURE AQUI suas chaves (mantê-las igual às que você informou) ---
const PUBLIC_KEY = "hvajaHnvxP1puGaNW";
const SERVICE_ID = "service_cxl8e48";
const TEMPLATE_ID = "template_o0hlp8g";
// ------------------------------------------------------------------------

// inicializa EmailJS (forma estável)
try {
if(!window.emailjs) {
console.error("EmailJS não carregado. Verifique o <script src>.");
showDebug("EmailJS não carregado. Verifique o <script src>.");
return;
}
emailjs.init(PUBLIC_KEY);
} catch(e) {
console.error("Erro ao inicializar EmailJS:", e);
showDebug("Erro ao inicializar EmailJS: " + safeStringify(e));
// continuar apesar do erro para logs
}

const form = document.getElementById("contatoForm");
const btn = document.getElementById("btnEnviar");
const debugEl = document.getElementById("emailjs-debug");

function showDebug(text) {
debugEl.style.display = "block";
const time = new Date().toLocaleTimeString();
debugEl.innerText = time + " — " + text + "\n\n" + debugEl.innerText;
}

function safeStringify(obj) {
try { return JSON.stringify(obj, Object.getOwnPropertyNames(obj), 2); }
catch(e) { return String(obj); }
}

form.addEventListener("submit", function(event) {
event.preventDefault();

btn.classList.add("loading");

// Força leitura dos campos e validações básicas
const dataPreview = {
Nome: (form.querySelector('[name="Nome"]')||{value:"(missing)"}).value,
Email: (form.querySelector('[name="Email"]')||{value:"(missing)"}).value,
WhatsApp: (form.querySelector('[name="WhatsApp"]')||{value:"(missing)"}).value,
Tipo_do_Projeto: (form.querySelector('[name="Tipo_do_Projeto"]')||{value:"(missing)"}).value,
Mensagem: (form.querySelector('[name="Mensagem"]')||{value:"(missing)"}).value,
};
console.log("DEBUG — dados que serão enviados:", dataPreview);
showDebug("Dados (preview): " + safeStringify(dataPreview));

// Faz o envio
emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form)
.then(function(response) {
btn.classList.remove("loading");
console.log("EmailJS success:", response);
showDebug("Success: " + safeStringify(response));

// Limpa o formulário após o envio bem-sucedido
form.reset(); 

// APLICAÇÃO DA SOLUÇÃO 2: Redirecionamento imediato + 'return' para encerrar a promessa.
window.location.replace("sucesso.html"); 
return; 
})
.catch(function(err) {
btn.classList.remove("loading");
console.error("EmailJS erro (obj):", err);

// Mostra mensagens detalhadas no debug e em alert para você copiar
let details = "";

// Se err é um objeto com status/text
if(err && err.status) details += "status: " + err.status + "\n";
if(err && err.text) details += "text: " + err.text + "\n";
if(err && err.message) details += "message: " + err.message + "\n";

// tentar stringify completo
details += "\nFull object:\n" + safeStringify(err);
showDebug("Erro no envio:\n" + details);
alert("Erro ao enviar. Detalhes no console e no topo da página. Copie o texto e cole aqui para eu analisar.");
});
});

})();