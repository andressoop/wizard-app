<template>
    <div id="app">
        <navigation v-if="isLoggedin" @onCollapse="onCollapse"></navigation>
        <fade-transition origin="center" mode="out-in" :duration="250">
            <div id="content-area-loggedOut" :class="[{'collapsed' : sidebarCollapsed}]">
                <router-view/>
            </div>
        </fade-transition>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { FadeTransition } from "vue2-transitions";
import Navigation from "./components/Navigation";

export default {
    components: {
        FadeTransition,
        Navigation
    },
    data() {
        return {
            sidebarCollapsed: false
        };
    },
    computed: mapGetters(["isLoggedin"]),
    methods: {
        onCollapse(collapsed) {
            this.sidebarCollapsed = collapsed;
        }
    },
    mounted() {
        if (this.isLoggedin) {
            document.getElementById("content-area-loggedOut").id =
                "content-area-loggedIn";
        }
    }
};
</script>

<style>
#content-area-loggedIn {
    padding-left: 250px;
    -webkit-transition: all 0.4s ease;
    -moz-transition: all 0.4s ease;
    -o-transition: all 0.4s ease;
    transition: all 0.4s ease;
}

#content-area-loggedIn.collapsed {
    padding-left: 50px;
    -webkit-transition: all 0.4s ease;
    -moz-transition: all 0.4s ease;
    -o-transition: all 0.4s ease;
    transition: all 0.4s ease;
}

.container-main {
    max-width: 600px;
}
</style>
