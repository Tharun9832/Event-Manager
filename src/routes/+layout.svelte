<div class="header">
    <div class="header-left">
        <p>Event Manager</p>
    </div>
    <div class="header-right">
        <a href="/">Home</a>
        <a href="/login">Login</a>
    </div>
</div>

<slot/>

<style>
    a:link {
        color: var(--title-color);
    }
    a:visited {
        color: var(--title-color);
    }
    .header {
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0 1px 5px 0px grey;
    }
    .header-left {
        margin-left: 25px;
        font-family: var(--title-font);
        font-size: 1.4rem;
    }
    .header-right {
        width: 110px;
        font-family: var(--body-font);
        margin-right: 25px;
        font-size: 1rem;
        display: flex;
        justify-content: space-between;
    }
</style>