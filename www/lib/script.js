window.onload = function(){
  const cadastrar = document.querySelector("#cadastrar");
  const nome = document.querySelector("#nome");
  const curso = document.querySelector("#curso");
  const buscar = document.querySelector("#buscar");
  const alterar = document.querySelector("#alterar");
  const deletar = document.querySelector("#deletar");
  const codigo = document.querySelector("#codigo");
  var v = true;

  //ação de cadastrar uma pessoa e curso
  cadastrar.addEventListener("click", function(){
    checkConnection();
    if(v==false){
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
    }
  });

  //método que lista uma pessoa
  buscar.addEventListener("click", function(){
  checkConnection();
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
  });

  //método para alterar os dados dos registros
  alterar.addEventListener("click", function(){
  checkConnection();
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
  checkConnection();
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

  codigo.addEventListener("click",function(){
    checkConnection();
    if(v==false){
    cordova.plugins.barcodeScanner.scan(
          function (result) {
              id.value = result.text;
              buscar.click();
          },
          function (error) {
              alert("O scanner falhou: " + error);
          },
          {
              preferFrontCamera : false, // iOS and Android
              showFlipCameraButton : true, // iOS and Android
              showTorchButton : true, // iOS and Android
              torchOn: false, // Android, launch with the torch switched on (if available)
              saveHistory: true, // Android, save scan history (default false)
              prompt : "Place a barcode inside the scan area", // Android
              resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
              formats : "QR_CODE", // default: all but PDF_417 and RSS_EXPANDED
              orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
              disableAnimations : true, // iOS
              disableSuccessBeep: false // iOS and Android
          }
      );
    }
});

function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    if(states[networkState]==states[Connection.NONE]){
      function onConfirm(buttonIndex){
        if(buttonIndex==1){
          navigator.app.exitApp();
        }
      }
      v = false;

      navigator.notification.confirm(
          'Você está sem conexão tente realizar essa consulta mais tarde', // message
          onConfirm,            // callback to invoke with index of button pressed
          'Erro de Conexão',           // title
          ['SAIR','FICAR']     // buttonLabels
      );
    }
    else{
      v = true;
    }
  }
};