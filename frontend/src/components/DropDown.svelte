<script lang="ts">
    let { options, label = "", ostyle = "", onChangeCb = null, value = $bindable() } = $props()

    const onOptChange = (e: any) => {
        e.preventDefault();
        value = e.target.value;
        if(onChangeCb) onChangeCb(value)
    }

</script>

<div class="w-full">
    {#if label}
        <span class="text-sm text-theme font-bold">{label}</span>
    {/if}
    <select {value} class="w-full mt-2 accent-theme text-sm p-1 px-2 {ostyle}" onchange={onOptChange}>
        {#each options as opt, ind}
            <option selected={ind == 0 ? true : false}>{opt}</option>
        {/each}
    </select>
</div>