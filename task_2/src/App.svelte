<style>
    main {
        width: 100%;
        height: 100%;
        display: grid;
        place-items: center;
    }
</style>

<script lang="ts">
    import './app.css'
    import Footer from "./components/Footer.svelte";
    import Converter from "./components/Converter.svelte";
</script>

<main>
    <Converter/>
</main>
<Footer/>
