<template>
    <div>
        <form-data
        :title="'Tambah Surat Rujukan'"
        :content="content"
        :action="saveData"></form-data>
    </div>
</template>

<script>
import api from '@/common/api.services'

export default {
    data(){
        return{
            'content':{
                'name':'',
                'namapasien':'',
                'umur':'',
                'jeniskelamin':'',
                'alamat':'',
                'hewan':'',
                'lokasi':'',
                'tanggaltergigit':'',
                'status':'',
                'statushewan':'',
                'var':'',
                'pernahvar':'',
                'description':'',
                // 'aksi':'',
                'id_user':'',
                // 'image':'',
            }
        }
    },
    components:{
        FormData: () => import('@/components/admin/FormContent.vue')
    },
    methods:{
        saveData(){
          api.postApi('/content',{
            name:this.content.name,
            namapasien:this.content.namapasien,
            umur:this.content.umur,
            jeniskelamin:this.content.jeniskelamin,
            alamat:this.content.alamat,
            hewan:this.content.hewan,
            lokasi:this.content.lokasi,
            tanggaltergigit:this.content.tanggaltergigit,
            status:this.content.status,
            statushewan:this.content.statushewan,
            var:this.content.var,
            pernahvar:this.content.pernahvar,
            description:this.content.description,
            // aksi:this.content.aksi,
             id_user  : this.$auth.getUser(),
            //   image : this.content.image,

          })
          .then(r=>{
              console.log(r.statusText)
              this.$router.push('/admin/content')
          }).catch((e)=>{
            console.log(e)
          })
        }
    }

}
</script>

<style>

</style>
