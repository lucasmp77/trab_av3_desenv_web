class App {

    loadPartials(){
        this.loadHeader();
        this.loadMenu();
    }

    loadHeader(){
        fetch('/partials/header.html')
        .then(response=> response.text())
        .then(text=> document.getElementById('header').innerHTML = text);
    }

    loadMenu(){
        fetch('/partials/menu.html')
        .then(response=> response.text())
        .then(text=> document.getElementById('sidebarMenu').innerHTML = text);
    }

    verificarUsuarioLogado(){
        let user = localStorage.getItem('user');
        if(user === null){
            window.location.href = "/login.html";
        }
    }
}

const app = new App();
app.loadPartials();
