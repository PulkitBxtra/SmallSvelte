 <script lang="ts">

  let tableData: Array<Array<any>> = [];
  let headers: Array<string> = [];


    import { onMount } from "svelte";
    import type { AuthSession } from "@supabase/supabase-js";
    import { supabase } from "../supabaseClient";
    import axios from "axios";
  
    export let session: AuthSession;
  
    let loading = false
    let username: string | null = null
    let website: string | null = null
    let avatarUrl: string | null = null

    let value: string;
  
    onMount(() => {
      getProfile()
    }) 
  
    const getProfile = async () => {
      try {
        loading = true
        const { user } = session
  
        const { data, error, status } = await supabase
          .from('profiles')
          .select('username, website, avatar_url')
          .eq('id', user.id)
          .single()
  
        if (error && status !== 406) throw error
  
        if (data) {
          username = data.username
          website = data.website
          avatarUrl = data.avatar_url
        }
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message)
        }
      } finally {
        loading = false
      }
    }
  
    const updateProfile = async () => {
      try {
        loading = true
        const { user } = session
  
        const updates = {
          id: user.id,
          username,
          website,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString(),
        }
  
        const { error } = await supabase.from('profiles').upsert(updates)
  
        if (error) {
          throw error
        }
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message)
        }
      } finally {
        loading = false
      }
    }


  const sendPostRequest = async () => {
    axios.post('http://localhost:3000/execute-sql', {
    "query": `${value}`
  })
  .then(function (response) {
    // console.log(response.data);
    var data=response.data.result;
    if (data) {
            // Assuming data is an array of rows where each row is an object
            tableData = data.map(row => Object.values(row));
        }
  })
  .catch(function (error) {
    console.log(error);
  });
}






  const sendPostRequest2 = async () => {
    axios.post('http://localhost:3000/execute-sql', { "query": `${value}` })
    .then(function (response) {
      const data = response.data.result;
      if (data && data.length > 0) {
        headers = Object.keys(data[0]); // Get headers from the keys of the first row
        tableData = data.map(row => Object.values(row));
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }




  </script>
  
  <!-- <form on:submit|preventDefault={updateProfile} class="form-widget">
    <div>Email: {session.user.email}</div>
    <div>
      <label for="username">Name</label>
      <input id="username" type="text" bind:value={username} />
    </div>
    <div>
      <label for="website">Website</label>
      <input id="website" type="text" bind:value={website} />
    </div>
    <div>
      <button type="submit" class="button primary block" disabled={loading}>
        {loading ? 'Saving ...' : 'Update profile'}
      </button>
    </div>
    <button type="button" class="button block" on:click={() => supabase.auth.signOut()}>
      Sign Out
    </button>
  </form> -->


    <div class="flex flex-row justify-between mx-5 items-center mt-5">
        <div>
            <p>SQL Expert</p>
        </div>

        <div class="flex flex-row gap-4 items-center">
            <p>Hello {username}!</p>

            <button type="button" class="button block p-2 bg-red-400 rounded-md" on:click={() => supabase.auth.signOut()}>
                Sign Out
            </button>

        </div>
    </div>


    <div>
        <div>
            <textarea name="input" bind:value={value} class="bg-gray-800 rounded-sm border p-5 w-[40%] h-96 m-5"></textarea>
        </div>

        <button type="button" class="button block p-2 bg-green-400 rounded-md" on:click={sendPostRequest2}>
          Send POST Request
        </button>
    </div>

    <p>{value}</p>

    <div class="w-[60%] mx-5">
      <table class="table-auto border-collapse border border-slate-400">
        <thead>
          {#if headers.length > 0}
            <tr>
              {#each headers as header}
                <th class="border border-slate-300 px-4 py-2">{header}</th>
              {/each}
            </tr>
          {/if}
        </thead>
        <tbody>
          {#if tableData.length > 0}
            {#each tableData as row, rowIndex}
              <tr>
                {#each row as cell, cellIndex}
                  <td class="border border-slate-300 px-4 py-2">{cell}</td>
                {/each}
              </tr>
            {/each}
          {:else}
            <tr>
              <td colspan={headers.length} class="border border-slate-300 px-4 py-2 text-center">
                No data available.
              </td>
            </tr>
          {/if}
        </tbody>
      </table>
    </div>
