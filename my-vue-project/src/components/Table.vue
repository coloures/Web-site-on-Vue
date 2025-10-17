<template>
  <table border="1">
    <thead>
      <tr>
        <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rowIndex) in data" :key="rowIndex">
        <td v-for="(cell, cellIndex) in row" :key="cellIndex">
          {{ cell }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps({
  headers: {
    type: Array,
    required: true
  },
  data: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

table {
    border-collapse: collapse;
    margin: 0 auto;
}

th {
    padding: 5px;
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