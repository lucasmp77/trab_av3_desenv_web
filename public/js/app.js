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
}

const app = new App();
app.loadPartials();
