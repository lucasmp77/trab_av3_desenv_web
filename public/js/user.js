class User {

    id = 0;

    autenticacao(){

        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        if(email == "" && senha == ""){
            alert("Informe os campos corretamente")
        } else {

            fetch("/autenticacao", {
                method: 'POST',
                headers: {
                  'Accept': '*/*',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: email, senha: senha})
            }).then(res=> res.json()).then(res=>{
                let usuario = res[0];
                try{
                    if(typeof usuario.nome != "undefined"){
                        localStorage.setItem("user",JSON.stringify(usuario));
                        window.location.href = "/";
                    } else {
                        alert("Usuário não existe ou não tem permissão")
                    }
                } catch(error){
                    alert("Usuário não existe ou não tem permissão")
                }
                
            });
            

        }

    }

    sair(){
        localStorage.removeItem("user");
        window.location.href = "/login.html";
    }

    listar(){

        fetch("/users").then(res=> res.json()).then(usuarios=>{
            
            try{
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
            } catch(error){
                alert("Falha ao listar")
            }
            
        });

    }

    getById(){

        fetch(`/users/${this.id}`).then(res=> res.json()).then(usuarios=>{
            let usuario = usuarios[0];
            
            try{

                document.getElementById("nome").value = usuario.nome;
                document.getElementById("email").value = usuario.email;
                document.getElementById("senha").value = usuario.senha;

            } catch(error){
                alert("Falha ao carregar")
            }
            
        });

    }

    remover(id){


        fetch(`/users/${id}`, {
            method: 'DELETE'
        }).then(res=> res.text()).then(()=>{
            window.location.href = "/lista-user.html";
        });
        
    }

    gravar (){
        
        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        if(nome == "" || email == "" || senha == ""){
            alert("Informe os campos corretamente")
        } else {

            if(this.id === 0){
                fetch("/users", {
                    method: 'POST',
                    headers: {
                      'Accept': '*/*',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({email: email, senha: senha, nome:nome})
                }).then(res=> res.text()).then(res=>{
                    document.getElementById("nome").value = "";
                    document.getElementById("email").value = "";
                    document.getElementById("senha").value = "";
                    this.id = 0;
                    alert("Usuário cadastrado com sucesso!")
                });
            } else {
                fetch(`/users/${this.id}`, {
                    method: 'PUT',
                    headers: {
                      'Accept': '*/*',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({email: email, senha: senha, nome:nome})
                }).then(res=> res.text()).then(res=>{
                    document.getElementById("nome").value = "";
                    document.getElementById("email").value = "";
                    document.getElementById("senha").value = "";
                    this.id = 0;
                    alert("Usuário editado com sucesso!")
                });
            }

        }
        
    }

}

const user = new User();