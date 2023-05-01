<template>
    <div class="flex flex-col items-center justify-center h-screen">
        <h1 class="text-4xl font-bold text-gray-300">404 Not Found</h1>
        <h2 class="text-lg text-gray-300">The page you are looking for does not exist.</h2>
        <router-link to="/">
            <button class="mt-6 px-4 py-2 bg-gray-700 rounded-md text-gray-300 hover:bg-gray-600 hover:text-gray-200 transition duration-200">Back to Home</button>
        </router-link>
    </div>
</template>

<script>
export default {
    name: "404View"
}
</script>

<style scoped>

</style>
