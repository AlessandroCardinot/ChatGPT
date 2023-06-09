const form_pergunta_chat = document.getElementById('form-pergunta-chat');

//api key
const openai_api_key = "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";

if (form_pergunta_chat) {
    var mostrar_pergunta = document.getElementById("mostrar_pergunta");
    mostrar_pergunta.innerHTML = "";
    var resposta_chat = document.getElementById("resposta_chat");
    resposta_chat.innerHTML = "";

    form_pergunta_chat.addEventListener("submit", async (e) => {
        e.preventDefault();

        let pergunta = document.getElementById('campo-pergunta').value;
        mostrar_pergunta.innerHTML = pergunta;
        console.log(pergunta);

        //requisição para o chatgpt
        await fetch("https://api.openai.com/v1/completions", {
            //Método para enviar os dados
            method: "POST",

            //Dados enviados no cabeçalho da requisição
            headers: {
                Accept: "application/json", "Content-Type": "application/json",
                Authorization: "Bearer "+openai_api_key,
            },
            //Enviar os dados no corpo da requisição
            body: JSON.stringify({
                model: "text-davinci-003", //Modelo
                prompt: pergunta,
                max_tokens: 2048, //Tamanho da resposta
                temperature: 1 //Criatividade na resposta
            }),
        })
        //Acessa o then quando tiver resposta
        .then((resposta) => resposta.json())
        .then((dados) => {
            resposta_chat.innerHTML = dados.choices[0].text;
            //console.log(dados.choices[0].text);
        })
        //Retorna catch quando gerar algum erro
        .catch((erro) => {
            resposta_chat.innerHTML = erro;
            console.log(erro);
        });
    });

    //Retorna a resposta para o html


}