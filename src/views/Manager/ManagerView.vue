<script setup></script>

<template>
  <div class="root">
    <div class="cg-content">
      <RouterView />
    </div>
  </div>
</template>

<style>
.root {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgb(237, 242, 247);
}

.cg-content {
  /* width: 30vw; */
  /* min-width: 450px; */
  /* height: 60vh; */
  padding: 20px 20px;
  border-radius: 10%;
  box-shadow: 2.1px 2.4px 55.3px rgba(0, 0, 0, 0.047),
    5.9px 6.9px 90.6px rgba(0, 0, 0, 0.071),
    12.7px 15px 92.6px rgba(0, 0, 0, 0.093), 23px 27px 80px rgba(0, 0, 0, 0.13);
}

.content-base {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  margin: 10px 0;
}
</style>
