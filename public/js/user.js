class User {

    id = 0;

    async autenticacao(){

        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        if(email == "" && senha == ""){
            alert("Informe os campos corretamente")
        } else {

            // chamar a api
            let usuario = {id:"01", nome:"Lucas"} // retorno da api
            
            if(typeof usuario.nome != "undefined"){
                localStorage.setItem("user",JSON.stringify(usuario));
                window.location.href = "/";
            } else {
                alert("Usuário não existe ou não tem permissão")
            }

        }

    }

    sair(){
        localStorage.removeItem("user");
        window.location.href = "/login.html";
    }

    async listar(){

        // vai no banco e pega todos os usuarios -- chamar API
        let usuarios = [
            {id:1,nome:"Lucas",email:"lucas@mail.com"},
            {id:1,nome:"asdf",email:"luasdcas@mail.com"},
            {id:1,nome:"aaa",email:"ludasdcas@mail.com"},
            {id:1,nome:"sss",email:"lucdasas@mail.com"},
            {id:1,nome:"ddd",email:"lucfdasas@mail.com"},
            {id:1,nome:"Lueeeeeeecas",email:"lu1234cas@mail.com"},
            {id:1,nome:"asdf",email:"lu123cas@mail.com"},
            {id:1,nome:"Laaaaaaaaaaucas",email:"l123ucas@mail.com"}
        ]

        let tabela = document.getElementById("usuarios-conteudo");
        let tr = "";
        usuarios.forEach(element=>{
            tr += `<tr>
                        <td>${element.nome}</td>
                        <td>${element.email}</td>
                        <td><a href="/form-user.html?id=${element.id}">Editar</a> - <a href="javascript:void(0)" onclick="user.remover(${element.id})">Remover</a></td>
                    </tr>`;
        })
        tabela.innerHTML = tr;

    }

    async remover(id){

        // vou no banco remover via API
        window.location.href = "/lista-user.html";

    }

    async gravar (){

        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        if(nome == "" || email == "" || senha == ""){
            alert("Informe os campos corretamente")
        } else {

            if(id == 0){
                // Gravar chamar api
            } else {
                // Editar chamar api
            }

        }
        
    }

}

const user = new User();