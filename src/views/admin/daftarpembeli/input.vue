<template>
    <div>
        <form-data
        :title="'Tambah Pembeli'"
        :content="content"
        :action="saveData"></form-data>
    </div>
</template>

<script>
import api from '@/common/api.services'
var qs = require('qs');

export default {
    data(){
        return{
            'content':{
                'nama_pembeli':'',
                'alamat':'',
                'no_hp':'',
                'Jenis_kelamin':'',
                'tanggal_lahir':'',
            }
        }
    },
    components:{
        FormData: () => import('@/components/admin/FormPembeli.vue')
    },
    methods:{
        saveData(){
            console.log("data",this.content.jenis_kelamin)
            console.log("data",this.content.nama_pembeli)
            console.log("data",this.content.tanggal_lahir)
            console.log("data",this.content.alamat)
            console.log("data",this.content.no_hp)
            api.postApi('/pembeli/create.php',
        //     {
        //     nama_pembeli:this.content.nama_pembeli,
        //     alamat:this.content.alamat,
        //     no_hp:this.content.no_hp,
        //     jenis_kelamin:this.content.jenis_kelamin,
        //     tanggal_lahir:this.content.tanggal_lahir
        //   }
        qs.stringify({
            nama_pembeli:this.content.nama_pembeli,
            alamat:this.content.alamat,
            no_hp:this.content.no_hp,
            jenis_kelamin:this.content.jenis_kelamin,
            tanggal_lahir:this.content.tanggal_lahir
        })
          )
          .then(r=>{
              console.log(r.statusText)
              this.$router.push('/admin/daftarpembeli')
          }).catch((e)=>{
            console.log(e)
          })
        }
    }

}
</script>

<style>

</style>
