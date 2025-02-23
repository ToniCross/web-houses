//M.AutoInit();

$(document).ready(function () {

    // SIDENAV INIT
    $('.sidenav').sidenav();

    // SLIDER INIT
    $('.slider').slider({
        indicators: false,
        // we don't want the little dots to show
        height: 500,
        transition: 500,
        interval: 6000
        // how long the slide stays for
    });

    // AUTOCOMPLETE FOR THE SEARCH FIELD
    $('.autocomplete').autocomplete({
        data: {
            'Praça da Fé': null,
            'Parque do Lago': null,
            'São Francisco': null,
            'Cidade dos Lagos': null,
            'Lagoa das Lágrimas': null,
            'Parque das Araucárias': null
        }
    });

    // INIT SCROLLSPY
    $('.scrollspy').scrollSpy();
});

function validarCPF() {
    let cpf = document.getElementById("cpf").value;
    let regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/; // Formato: 000.000.000-00
    if (!regex.test(cpf)) {
      document.getElementById("cpf-erro").innerText = "CPF inválido!";
    } else {
      document.getElementById("cpf-erro").innerText = "CPF válido!";
    }
  }

  // Salvar um nome no armazenamento
localStorage.setItem("nome", "João");

// Recuperar o nome salvo
let nomeSalvo = localStorage.getItem("nome");
console.log(nomeSalvo); // João
