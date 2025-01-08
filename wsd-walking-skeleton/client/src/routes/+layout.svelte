<script>
    import "../app.css";
    import { ToastProvider } from "@skeletonlabs/skeleton-svelte";

    let {children} = $props();
</script>
<ToastProvider>
  <div class="flex flex-col h-full">
    <!--        <Header/>-->

    <main class="container mx-auto max-w-2xl grow">
      {@render children()}
    </main>

    <!--        <Footer/>-->
  </div>
</ToastProvider>
