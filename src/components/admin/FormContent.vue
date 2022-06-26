<template>
    <div>
        <v-card>
            <v-card-title>
                <span class="headline">{{ title }}</span>
            </v-card-title>
            <v-form>
            <v-card-text>
                    <v-text-field label="Judul" v-model="mutableContent.name"></v-text-field>
                    <v-text-field label="Nama pasien" v-model="mutableContent.namapasien"></v-text-field>
                    <v-text-field label="Umur Pasien" v-model="mutableContent.umur"></v-text-field>
                    <v-autocomplete v-model="mutableContent.jeniskelamin" :items="itemss" label="Jenis Kelamin"></v-autocomplete>
                    <v-text-field label="Alamat Pasien" v-model="mutableContent.alamat"></v-text-field>
                    <v-text-field label="Hewan Yang Menggigit" v-model="mutableContent.hewan"></v-text-field>
                    <v-text-field label="Lokasi Gigitan" v-model="mutableContent.lokasi"></v-text-field>
                    <b>Tanggal Tergigit</b> <br><br>
                    <!-- <v-text-field label="Lokasi Gigitan"></v-text-field> -->
                    <v-date-picker label="Tanggal Tergigit" v-model="mutableContent.tanggaltergigit"></v-date-picker>


                    <!-- <v-text-field label="Status Hewan" v-model="mutableContent.status"></v-text-field> -->
                    <v-autocomplete v-model="mutableContent.status" :items="items" label="Status Hewan"></v-autocomplete>
                    <v-autocomplete v-model="mutableContent.statushewan" :items="itemsh" label="Keadaan Hewan "></v-autocomplete>
                    <v-autocomplete v-model="mutableContent.var" :items="itemsv" label="Apakah Pernah Di Var "></v-autocomplete>
                    <v-autocomplete v-model="mutableContent.pernahvar" 
                    :readonly = "!mutableContent.var || this.mutableContent.var == 'Belum Pernah' "
                    :disabled = "!mutableContent.var || this.mutableContent.var == 'Belum Pernah'"
                    :items="itemspv" label="Kapan ? "></v-autocomplete>
 
                    <v-textarea name="input-7-1" v-model="mutableContent.description"
                      label="Detail Kejadian">
                    </v-textarea>
                    <!-- <v-text-field label="judul" v-model="mutableContent.aksi"></v-text-field> -->
                <!-- <input type="file" @change="imageChanged" /> -->

            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="success" @click="action">Save</v-btn>
                <v-btn color="warning" to="/admin/content">Cancel</v-btn>
            </v-card-actions>
            </v-form>
        </v-card>
    </div>
</template>

<script>
export default {
    data(){
        return{
            'mutableContent' : this.content,
            selectedFile : null,
     items: ['Berpemilik', 'Tidak Berpemilik'],
     itemss: ['Laki-Laki', 'Perempuan'],
     itemsh: ['Hidup', 'Mati','Hilang','Dibunuh'],
     itemsv: ['Pernah', 'Belum Pernah'],
     itemspv: ['< 3 Bulan', '3 - 12 Bulan','> 12 Bulan'],
    // 'mutableContent.var':false,
    // 'mutableContent.var':null
        }
    },
    props:[
        'title',
        'content',
        'action'
    ],
    methods:{
        upload(e){
            let img = e.target.files[0]
            let fd = new FormData()

            fd.append('image',img)
        },
        onFilePicked(e){
            const files = e.target.files
            if(files[0] !==undefined){
                this.$root.imageName = files[0].name
                if(this.$root.imageName.lastIndexOf('.')<=0){
                    return
                }
                const fr = new FileReader()
                fr.readAsDataURL(files[0])
                fr.addEventListener('load',()=>{
                    this.$root.imageUrl = fr.result
                    this.$root.imageFile = files[0]
                })
            } else{
                this.$root.imageName='';
                this.$root.imageFile='';
                this.$root.imageUrl='';
            }
        },
        imageChanged(e){
            // console.log(e.target.files[0])
            var fileReader = new FileReader()
            fileReader.readAsDataURL(e.target.files[0])
            fileReader.onload = (e) => {
                this.mutableContent.image = e.target.result
            }
        },
    }
}
</script>

<style>

</style>
