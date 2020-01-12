<template>
    <div class="dashboard-container">
        <header>
            <el-carousel
                :interval="6000"
                type="card"
                height="400px"
            >
                <el-carousel-item
                    v-for="item in carouselImages"
                    :key="item"
                >
                    <img
                        :src="item + carouselPrefix"
                        class="image"
                    >
                </el-carousel-item>
            </el-carousel>
        </header>
        <component is="AdminDashboard" />
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import AdminDashboard from './admin/index.vue'

    @Component({
        name: 'Dashboard',
        components: {
            AdminDashboard
        }
    })
    export default class extends Vue {

        private carouselImages = [
            'https://wpimg.wallstcn.com/9679ffb0-9e0b-4451-9916-e21992218054.jpg',
            'https://wpimg.wallstcn.com/bcce3734-0837-4b9f-9261-351ef384f75a.jpg',
            'https://wpimg.wallstcn.com/d1d7b033-d75e-4cd6-ae39-fcd5f1c0a7c5.jpg',
            'https://wpimg.wallstcn.com/50530061-851b-4ca5-9dc5-2fead928a939.jpg'
        ]
        private avatarPrefix = '?imageView2/1/w/80/h/80'
        private carouselPrefix = '?imageView2/2/h/440'

        created() {

        }

        private handleClick() {

        }
    }
</script>

<style lang="scss" scoped>
.dashboard-container {
    padding: 0 32px;
    background-color: #fff;
    .el-carousel__item {
        img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
