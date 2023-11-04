<script>
    import {cart} from './../stores.js';

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

</script>


<p>your cart has {cart_value} items</p>


<button on:click={increment}>
    +
</button>

<button on:click={decrementcrement}>
    -
</button>

<button on:click={reset}>
    reset    
</button>

