<template>
  <main>
    <div class="register-container">
      <div class="login-wrapper">
        <div class="left">
          <h1 class='title'>CHATTER.IO</h1>
          <input id="login" class="validInput" placeholder="Username" />
          <input id="password" type="password" class="validInput" placeholder="Password"/>
          <input id="repeat-password" type="password" class="validInput" placeholder="Repeat password" />
          <input id="mail" type="email" class="validInput" placeholder="E-mail" />
          <div><input type='checkbox' /> agree terms of sprzedawania narządów </div>
          <button class="validInput">Register</button>
        </div>
        <div class="right">
          <img src="./icons/icon.png" class="icon" />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
  main{
    width:100vw;
    height:100vh;
    display:flex;
    justify-content: center;
    align-items:center;
    background:#55AAFF;
  }
  .title{
    color:black;
    font-family:'Verdana';
  }
  .left{
    display:flex;
    flex-direction:column;
    width:100%;
  }
  .login-wrapper {
    -webkit-box-shadow: 9px 21px 41px -6px rgba(66, 68, 90, 1);
  -moz-box-shadow: 9px 21px 41px -6px rgba(66, 68, 90, 1);
  box-shadow: 9px 21px 41px -6px rgba(66, 68, 90, 1);
    width: 40vw;
    height: 45vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items:center;
    padding-left:66px;
    color: white;
    background: rgba(127,127,127,0.5);
    border-radius:10px;
  }
  .validInput {
    width: 75%;
    padding: 5px;
    margin: 5px;
    text-align:center;
  }
  a {
    cursor: pointer;
  }
  .smallText{
    font-size:12px;
  }
  .right{
    margin-top:20px;
    margin-right:60px;
  }
  .icon{
    user-select: none;
    width:100%;
    height:100%;
  }
</style>
<script>
</script>