<template>
  <main>
    <header><h1>Список лауреатов</h1></header>
    <article>
      <section>
        <Table :headers="laureatsData.headers" :data="laureatsData.rows" />
      </section>
      <aside>
        <nav>
          <ul class="nav-bar">
            <li><a href="#" @click.prevent="$router.push('/prizes')">Список нобелевских премий</a></li>
            <li><a href="#" @click.prevent="$router.push('/laureats')">Список лауреатов</a></li>
          </ul>
        </nav>
      </aside>
    </article>
    <footer><h1>Что-то тут есть</h1></footer>
  </main>
</template>

<script setup>
import Table from '@/components/Table.vue'
import { laureatsData } from '@/data.js'
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

html, body {
    height: 100%;
}
main {
    overflow: auto;
}
header {
    overflow: auto;
    width: 100%;
    height: 100px;
    background-color: gainsboro;
}

header h1 {
    margin-top: 20px;
    margin-left: 20px;
}

article {
    display: grid;
    grid-template-columns: 2fr 1fr;
    height: 80vh;
}

section {
    padding-top: 50px;
}

aside {
    background-color: bisque;
    height: 100%;
    padding-top: 50px;
    text-align: center;
    display: flex;
    flex-direction: column;
}

.nav-bar {
    display: flex;
    flex-direction: column;
    list-style: none;
}

table {
    border-collapse: collapse;
    margin: 0 auto;
}

th {
    padding: 5px;
}

footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100px;
    background-color: gainsboro;
}

table tbody tr:nth-child(odd) 
{
    background-color: blanchedalmond;
}

table tbody tr:nth-child(even) 
{
    background-color: cornsilk;
}
</style>