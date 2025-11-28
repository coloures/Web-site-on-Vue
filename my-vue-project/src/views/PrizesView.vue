<template>
  <main>
    <header><h1>Список нобелевских премий</h1></header>
    <article>
      <section>
        <div class="filters">
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
          <label>
            Год:
            <input v-model="year" placeholder="Напр.: 2023" maxlength="4" />
          </label>
          <label>
            Лауреат:
            <input v-model="search" placeholder="Имя или фамилия" />
          </label>
          <label>
            Обоснование:
            <input v-model="motivationSearch" placeholder="Напр.: quantum, peace" />
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
    <footer><h1>Данные: Nobel Prize API (v1)</h1></footer>
  </main>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import Table from '@/components/Table.vue';
import nobelService from '@/services/nobelService';

const prizes = ref([]);
const category = ref('');
const year = ref('');
const search = ref('');
const motivationSearch = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(10);
const headers = ref(['Год', 'Категория', 'Лауреаты', 'Обоснование']);

const filteredPrizes = computed(() => {
  return nobelService.filterPrizes(prizes.value, {
    category: category.value,
    year: year.value,
    search: search.value,
    motivationSearch: motivationSearch.value
  });
});

const totalPages = computed(() => {
  return Math.ceil(filteredPrizes.value.length / itemsPerPage.value);
});

const rows = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const paginated = filteredPrizes.value.slice(start, start + itemsPerPage.value);
  return paginated.map(p => [
    p.year || '—',
    p.category || '—',
    p.laureates
      ? p.laureates.map(l => 
          (l.firstname || '') + (l.surname ? ' ' + l.surname : '')
        ).join('; ') || '—'
      : '—',
    (p.motivation || p.overallMotivation || '')
      .replace(/^"|"$/g, '')
      .trim() || '—'
  ]);
});

const pageNumbers = computed(() => {
  const total = totalPages.value;
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  
  const current = currentPage.value;
  const delta = 1;
  const left = Math.max(2, current - delta);
  const right = Math.min(total - 1, current + delta);
  
  const pages = [1];
  if (left > 2) pages.push('...');
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < total - 1) pages.push('...');
  pages.push(total);
  
  return pages;
});

watch([category, year, search, motivationSearch], () => {
  currentPage.value = 1;
});

const goToPage = (page) => {
  if (typeof page === 'number' && page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

onMounted(() => {
  nobelService.fetchPrizes()
    .then(data => {
      prizes.value = data;
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
.pagination .info {
  margin-left: 1rem;
  font-weight: bold;
}
</style>