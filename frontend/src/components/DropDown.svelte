<script lang="ts">
    let { options, label = "", ostyle = "", onChangeCb = null } = $props()

    const onOptChange = (e: any) => {
        e.preventDefault();
        const sel = e.target.value;
        if(onChangeCb) onChangeCb(sel)
    }

</script>

<div class="w-full">
    {#if label}
        <span class="text-sm text-theme font-bold">{label}</span>
    {/if}
    <select class="w-full mt-2 accent-theme text-sm p-1 px-2 {ostyle}" onchange={onOptChange}>
        {#each options as opt, ind}
            <option selected={ind == 0 ? true : false}>{opt}</option>
        {/each}
    </select>
</div>