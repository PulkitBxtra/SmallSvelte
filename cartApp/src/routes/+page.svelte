<script>
    import {cart} from './../stores.js';
    import {cart_items} from './../stores.js';

    const increment = () =>{
        cart.update((n) => n+1);
    }

    const decrement = () =>{
        cart.update((n) => n-1);
    }

    const reset = () =>{
        cart.set(0);
    }

    let cart_value;

    cart.subscribe((value) =>{
        cart_value=value;
    })


    cart_items.subscribe((value) =>{
        console.log(value);
    })

    const add_item = (value) => {
        cart_items.update((n) => [...n, value]);
    }



    add_item(1);
    add_item(1);
    add_item(1);
    add_item(1);

</script>


<p>your cart has {cart_value} items</p>


<button on:click={increment}>
    +
</button>

<button on:click={decrement}>
    -
</button>

<button on:click={reset}>
    reset    
</button>



