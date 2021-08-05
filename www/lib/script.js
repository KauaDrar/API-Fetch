window.onload = function(){
  const cadastrar = document.querySelector("#cadastrar");
  const nome = document.querySelector("#nome");
  const curso = document.querySelector("#curso");
  const buscar = document.querySelector("#buscar");
  const alterar = document.querySelector("#alterar");
  const deletar = document.querySelector("#deletar");

  //ação de cadastrar uma pessoa e curso
  cadastrar.addEventListener("click", function(){
    let formdata = new FormData();
    formdata.append('nome',`${nome.value}`);
    formdata.append('curso',`${curso.value}`);

    fetch("https://www.jussimarleal.com.br/exemplo_api/pessoa",
    {
      body: formdata,
      method:"post",
      mode:'cors',
      cache:'default'
    }).then(()=>{

      alert("Registro Cadastrado com Sucesso!");
      limparCampos();
      }
    );
  });

  //método que lista uma pessoa
  buscar.addEventListener("click", function(){
    fetch(`https://www.jussimarleal.com.br/exemplo_api/pessoa/${id.value}`,{
      method:"get",
      mode:'cors',
      cache:'default'
    }).then(response=>{
      response.json().then(data => {
        nome.value = data['nome'];
        curso.value = data['curso'];
      })
    })
  })

  //método para alterar os dados dos registros
  alterar.addEventListener("click", function(){
    fetch(`https://www.jussimarleal.com.br/exemplo_api/pessoa/${id.value}`,{
      method: "put",
      headers:{
        'Content-type':'application/json; charset=UTF-8'
      },
      body:JSON.stringify({
        'nome':`${nome.value}`,
        'curso':`${curso.value}`
      })
    }).then(()=>{
      alert("Registro Alterado com Sucesso!");
      limparCampos();
    });
  });

  //método  para deletar um registro
  deletar.addEventListener("click", function(){
    fetch(`https://www.jussimarleal.com.br/exemplo_api/pessoa/${id.value}`,{
      method:"delete",
      mode:'cors',
      cache:'default'
    }).then(()=>{
    alert("Registro Deletado com Sucesso!");
    limparCampos();
    });
  });

  //método para limpar os campos
  function limparCampos(){
    nome.value = "";
    curso.value = "";
  }
}