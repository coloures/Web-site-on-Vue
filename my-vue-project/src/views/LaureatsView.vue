<template>
  <main>
    <header><h1>Список лауреатов</h1></header>
    <article>
      <section>
        <div class="filters">
          <label>
            Поиск:
            <input v-model="search" placeholder="Имя или фамилия" />
          </label>
          <label>
            Категория:
            <select v-model="category">
              <option value="">Все</option>
              <option value="physics">Физика</option>
              <option value="chemistry">Химия</option>
              <option value="medicine">Медицина</option>
              <option value="literature">Литература</option>
              <option value="peace">Мир</option>
              <option value="economics">Экономика</option>
            </select>
          </label>
            Год:
            <input v-model="year" placeholder="Например: 2023" maxlength="4" />
          <label>

          </label>
        </div>

        <Table :headers="headers" :data="rows" />

        <div class="pagination" v-if="totalPages > 1">
        <button
          v-for="page in pageNumbers"
          :key="page"
          @click="goToPage(page)"
          :class="{ active: page === currentPage }"
          :disabled="page === '...'"
        >
          {{ page }}
        </button>
        <span class="info">Стр. {{ currentPage }} из {{ totalPages }}</span>
      </div>  
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
import { ref, computed, onMounted, watch } from 'vue';
import Table from '@/components/Table.vue';
import nobelService from '@/services/nobelService';

const laureates = ref([]);
const year = ref('');
const search = ref('');
const category = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(10);
const headers = ref(['ID', 'Имя', 'Родился', 'Умер', 'Премии']); 

const filteredLaureates = computed(() => {
  return nobelService.filterLaureates(laureates.value, {
    search: search.value,
    category: category.value,
    year: year.value
  });
});

const totalPages = computed(() => {
  return Math.ceil(filteredLaureates.value.length / itemsPerPage.value);
});

const formatDied = (date) => {
  if (!date || date === '0000-00-00') return 'Жив';
  return date;
};

const rows = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const paginated = filteredLaureates.value.slice(start, start + itemsPerPage.value);
  return paginated.map(l => [
    l.id || '—',
    (l.firstname || '') + (l.surname ? ' ' + l.surname : '—'),
    l.born || '—',
    formatDied(l.died), 
    l.prizes?.map(p => `${p.year} (${p.category})`).join('; ') || '—'
  ]);
});

const pageNumbers = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  const delta = 2; 
  const range = [];

  for (let i = Math.max(1, current - delta); i <= Math.min(total, current + delta); i++) {
    range.push(i);
  }

  const result = [];
  let prev = 0;

  range.forEach(page => {
    if (page - prev > 1) result.push('...');
    result.push(page);
    prev = page;
  });

  if (prev < total) result.push('...');

  if (result[0] !== 1) result.unshift(1);
  if (result[result.length - 1] !== total && total > 1) result.push(total);

  return [...new Set(result)];
});

watch([search, category, year], () => {
  currentPage.value = 1;
});

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

onMounted(() => {
  nobelService.fetchLaureates()
    .then(data => {
      laureates.value = data;
    });
});
</script>

<style scoped>
* { margin: 0; padding: 0; }
html, body { height: 100%; }
main { overflow: auto; }
header {
  overflow: auto; width: 100%; height: 100px; background-color: gainsboro;
}
header h1 { margin-top: 20px; margin-left: 20px; }
article { display: grid; grid-template-columns: 2fr 1fr; }
section { margin-top: 50px; }
aside {
  background-color: bisque; height: 100%; padding-top: 50px;
  text-align: center; display: flex; flex-direction: column;
}
.nav-bar { display: flex; flex-direction: column; list-style: none; }
table { border-collapse: collapse; margin: 0 auto; }
th { padding: 5px; }
footer {
  position: fixed; left: 0; bottom: 0; width: 100%;
  height: 100px; background-color: gainsboro;
}
table tbody tr:nth-child(odd) { background-color: blanchedalmond; }
table tbody tr:nth-child(even) { background-color: cornsilk; }

.filters {
  margin: 1rem 2rem;
  padding: 0.5rem;
  background: #f5f5f5;
  border-radius: 4px;
}
.filters label {
  display: inline-block;
  margin-right: 1rem;
  margin-bottom: 0.5rem;
}
.filters input,
.filters select {
  margin-left: 0.5rem;
  padding: 0.25rem;
}

.pagination {
  margin-top: 1rem;
  text-align: center;
}
.pagination button {
  margin: 0 0.1rem;
  padding: 0.3rem 0.5rem;
  font-size: 0.9rem;
  cursor: pointer;
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 3px;
}
.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.pagination button.active {
  background: #007bff;
  color: white;
  border-color: #0056b3;
}
.pagination .dots {
  background: none;
  border: none;
  cursor: default;
}
.pagination .info {
  margin-left: 1rem;
  font-weight: bold;
}
</style>