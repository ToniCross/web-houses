document.addEventListener("DOMContentLoaded", function () {
    let elems = document.querySelectorAll(".sidenav");
    if (elems.length > 0) {
      M.Sidenav.init(elems);
    }

    elems = document.querySelectorAll(".slider");
    M.Slider.init(elems);
  
    if (document.getElementById("cadastroForm")) {
      inicializarCadastroUsuario();
    }
  
    if (document.getElementById("formCadastro")) {
      inicializarCadastroImoveis();
    }
  
    if (document.getElementById("catalogo")) {
      carregarImoveis();
      configurarRemocaoImovel();
    }
  });

  function getUsuarios() {
    return JSON.parse(localStorage.getItem("usuarios")) || [];
  }
  
  function salvarUsuarios(usuarios) {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }
  
  // CADASTRO DE USUÁRIOS
  function inicializarCadastroUsuario() {
    document
      .getElementById("cadastroForm")
      .addEventListener("submit", function (event) {
        event.preventDefault();
        let nome = document.getElementById("nome").value;
        let email = document.getElementById("email").value;
        let senha = document.getElementById("senha").value;
        let usuarios = getUsuarios();
  
        if (usuarios.some((u) => u.email === email)) {
          document.getElementById(
            "msgCadastro"
          ).innerHTML = `<span class="text-danger">E-mail já cadastrado!</span>`;
          return;
        }
  
        usuarios.push({ nome, email, senha });
        salvarUsuarios(usuarios);
        document.getElementById(
          "msgCadastro"
        ).innerHTML = `<span class="text-success">Cadastro realizado com sucesso!</span>`;
        document.getElementById("cadastroForm").reset();
      });
  
    document
      .getElementById("loginForm")
      .addEventListener("submit", function (event) {
        event.preventDefault();
        let email = document.getElementById("loginEmail").value;
        let senha = document.getElementById("loginSenha").value;
        let usuarios = getUsuarios();
  
        let usuario = usuarios.find(
          (u) => u.email === email && u.senha === senha
        );
        if (usuario) {
          document.getElementById(
            "msgLogin"
          ).innerHTML = `<span class="text-success">Login bem-sucedido! Bem-vindo, ${usuario.nome}!</span>`;
        } else {
          document.getElementById(
            "msgLogin"
          ).innerHTML = `<span class="text-danger">E-mail ou senha inválidos!</span>`;
        }
      });
  }
  
  // CADASTRO DE IMÓVEIS 
  function inicializarCadastroImoveis() {
    document
      .getElementById("formCadastro")
      .addEventListener("submit", function (event) {
        event.preventDefault();
  
        const imagem = document.getElementById("imagem").value;
        const valor = document.getElementById("valor").value;
        const descricao = document.getElementById("descricao").value;
        const tamanho = document.getElementById("tamanho").value;
  
        const propriedade = { imagem, valor, descricao, tamanho };
  
        let propriedades =
          JSON.parse(localStorage.getItem("propriedades")) || [];
        propriedades.push(propriedade);
        localStorage.setItem("propriedades", JSON.stringify(propriedades));
  
        alert("Imóvel cadastrado com sucesso!");
        this.reset();
      });
  }
  
  // IMÓVEIS MOSTRAR E DELETAR
  function carregarImoveis() {
    const catalogo = document.getElementById("catalogo");
    catalogo.innerHTML = "";
  
    let propriedades = JSON.parse(localStorage.getItem("propriedades")) || [];
  
    propriedades.forEach((prop) => {
      const card = document.createElement("div");
      card.className = "col-12 col-md-6 col-lg-3 mb-4";
      card.innerHTML = `
        <div class="card">
          <img src="${prop.imagem}" class="card-img-top" alt="Imagem do Imóvel">
          <div class="card-body">
            <h5 class="card-title">R$${prop.valor}</h5>
            <p class="card-text">${prop.descricao}</p>
            <p class="card-text"><small>${prop.tamanho} m²</small></p>
            <a href="#" class="btn btn-primary btn-saiba-mais">Saiba mais</a>
          </div>
        </div>
      `;
      catalogo.appendChild(card);
    });
  }
  
  function inicializarCadastroImoveis() {
    document
      .getElementById("formCadastro")
      .addEventListener("submit", function (event) {
        event.preventDefault();
  
        const imagem = document.getElementById("imagem").value;
        const valor = document.getElementById("valor").value;
        const descricao = document.getElementById("descricao").value;
        const tamanho = document.getElementById("tamanho").value;
  
        let propriedades = JSON.parse(localStorage.getItem("propriedades")) || [];
  
        const existe = propriedades.some((prop) => prop.valor === valor);
        if (existe) {
          alert("Este imóvel já está cadastrado!");
          return;
        }
  
        const propriedade = { imagem, valor, descricao, tamanho };
        propriedades.push(propriedade);
        localStorage.setItem("propriedades", JSON.stringify(propriedades));
  
        alert("Imóvel cadastrado com sucesso!");
        this.reset();
  
        carregarImoveis();
      });
  }
  
  
  function configurarRemocaoImovel() {
    document.addEventListener("click", (event) => {
      if (event.target.classList.contains("btn-saiba-mais")) {
        const card = event.target.closest(".col-12");
        const valor = card.querySelector(".card-title").textContent.trim();
  
        removerImovel(valor);
        card.remove();
      }
    });
  }
  
  function removerImovel(valor) {
    let propriedades = JSON.parse(localStorage.getItem("propriedades")) || [];
    propriedades = propriedades.filter((prop) => `R$${prop.valor}` !== valor);
    localStorage.setItem("propriedades", JSON.stringify(propriedades));
  }
  