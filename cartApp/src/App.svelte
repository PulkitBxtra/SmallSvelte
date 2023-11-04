<script>
  import Counter from "./lib/Counter.svelte";
  import { Router, Link, Route } from "svelte-routing";
  import Page from "./routes/+page.svelte";

  export let url = "";
</script>

<Router {url}>
  <nav>
    <Link to="/">Home</Link>
    <Link to="/page">Page</Link>
  </nav>
  <div>
    <Route path="/page" component={Page} />
  </div>
</Router>



<style lang="postcss">
  :global(html) {
    background-color: theme(colors.gray.100);
  }
</style>