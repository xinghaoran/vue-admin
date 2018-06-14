<template>
  <div class="app-container">

    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="单位" v-model="listQuery.dw">
      </el-input>
      <el-select @change='handleFilter' style="width: 140px" class="filter-item" v-model="listQuery.sort">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">添加</el-button>
      <!-- <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">{{$t('table.export')}}</el-button> -->
    </div>

    <el-table :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="时间" min-width="150px">
        <template slot-scope="scope">
          <span>{{scope.row.date_today | changetodate}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="单位" min-width="100px">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.dw}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户" min-width="150px">
        <template slot-scope="scope">
          <span>{{scope.row.yh}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="许可证日期" min-width="150px">
        <template slot-scope="scope">
          <span>{{scope.row.date_xkz | changetodate}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="周期" min-width="150px">
        <template slot-scope="scope">
          <span>{{scope.row.zq}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="备注" min-width="150px">
        <template slot-scope="scope">
          <span>{{scope.row.bz}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="200px" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div align="center" style="margin-top:10px">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[5,10,20,30,200]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" center>
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="时间">
          <el-col :span="24">
            <el-date-picker type="date" placeholder="今天" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="form.date_today" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="单位">
          <el-col :span="24">
            <el-input v-model="form.dw"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="用户">
          <el-col :span="24">
            <el-input v-model="form.yh"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="24">
            <el-upload :data="fileinfo" drag ref="upload" :action="upUrl" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :file-list="fileList" :auto-upload="false">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或
                <em>点击上传</em>
              </div>
            </el-upload>
          </el-col>
        </el-form-item>
        <el-form-item label="许可证下发时间">
          <el-col :span="24">
            <el-date-picker :picker-options="pickerOptions" type="date" placeholder="许可证下发时间" v-model="form.date_xkz" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="周期">
          <el-col :span="24">
            <el-input v-model="form.zq"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="备注">
          <el-col :span="24">
            <el-input type="textarea" v-model="form.bz"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmit">确 定</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import {
  getFileList,
  getDocInfoList,
  addDocumentInfo,
  updateDocumentInfo,
  outPutFile,
  delFile,
  delDocument
} from '@/api/document'
export default {
  data() {
    return {
      form: {
        date_today: new Date(),
        dw: '',
        yh: '',
        date_xkz: null,
        zq: '',
        bz: ''
      },
      fileList: [],
      upUrl: process.env.BASE_API + '/Upload/UpLoad_file',
      listLoading: true,
      list: [],
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      fileinfo: { doc_id: '' },
      listQuery: {
        page: 1,
        limit: 20,
        dw: null,
        sort: '+id'
      },
      total: null,
      sortOptions: [
        { label: 'ID Ascending', key: '+id' },
        { label: 'ID Descending', key: '-id' }
      ],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ]
      }
    }
  },
  created() {
    this.getDocList()
  },
  methods: {
    onSubmit() {
      if (this.dialogStatus === 'create') {
        addDocumentInfo(this.form)
          .then(response => {
            this.fileinfo.doc_id = response.data // 上传携带的参数
            this.$refs.upload.submit() // 建档成功后上传文件
            this.dialogFormVisible = false // 关闭对话框
            this.getDocList() // 更新列表
          })
          .catch(reason => {
            console.log(reason)
          })
      }
      if (this.dialogStatus === 'update') {
        updateDocumentInfo(this.form)
          .then(response => {
            this.fileinfo.doc_id = response.data // 上传携带的参数
            this.$refs.upload.submit() // 建档成功后上传文件
            this.dialogFormVisible = false // 关闭对话框
            this.getDocList() // 更新列表
          })
          .catch(reason => {
            console.log(reason)
          })
      }
    },
    handleRemove(file, fileList) {
      // 文件列表移除文件时的钩子
      delFile(file.file_number)
    },
    handlePreview(file) {
      // 点击文件列表中已上传的文件时的钩子
      outPutFile(file.file_number)
      // window.open(
      //   process.env.BASE_API +
      //     '/Upload/UpLoad_file?file_number=' +
      //     file.file_number
      // )
    },
    beforeRemove(file, fileList) {
      // 删除文件之前的钩子，参数为上传的文件和文件列表
      return this.$confirm(`确定移除 ${file.name}？`)
      // 如果用户点击确定按钮，则 confirm() 返回 true。如果点击取消按钮，则 confirm() 返回 false。
      // 在用户点击确定按钮或取消按钮把对话框关闭之前，它将阻止用户对浏览器的所有输入。
      // 在调用 confirm() 时，将暂停对 JavaScript 代码的执行，在用户作出响应之前，不会执行下一条语句。
    },
    handleUpdate(row) {
      getFileList(row.id).then(response => {
        // 获取记录关联的文件列表
        this.fileList = response.data
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.form = Object.assign({}, row)
        this.form.date_today = new Date(
          parseInt(
            this.form.date_today.replace('/Date(', '').replace(')/', ''),
            10
          )
        )
        if (this.form.date_xkz === '/Date(-62135596800000)/') {
          this.form.date_xkz = null
        } else {
          this.form.date_xkz = new Date(
            parseInt(
              this.form.date_xkz.replace('/Date(', '').replace(')/', ''),
              10
            )
          )
        }

        this.$nextTick(() => {
          this.$refs['form'].clearValidate()
        })
      })
    },
    handleCreate() {
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.form.date_today = new Date()
      this.form.dw = null
      this.form.yh = null
      this.form.date_xkz = null
      this.form.zq = null
      this.form.bz = null
      this.fileList = []
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
    },
    handleDel(row) {
      delDocument(row.id).then(response => {
        this.getDocList()
      })
    },
    getDocList() {
      getDocInfoList().then(response => {
        this.list = response.data.docList
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {},
    handleSizeChange(val) {
      this.listQuery.limit = val
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
    },
    // 下载文件
    download(data) {
      if (!data) {
        return
      }
      const url = window.URL.createObjectURL(new Blob([data]))
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', 'txt')
      document.body.appendChild(link)
      link.click()
    }
  },
  filters: {
    changetodate(val) {
      if (val != null) {
        var date = new Date(
          parseInt(val.replace('/Date(', '').replace(')/', ''), 10)
        )
        // 月份为0-11所以+1，月份小于10补个0
        var month =
          date.getMonth() + 1 < 10
            ? '0' + (date.getMonth() + 1)
            : date.getMonth() + 1
        var currentDate =
          date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        // var hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
        // var minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
        // var second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
        // var d = date.getFullYear() + '-' + month + '-' + currentDate + ' ' + hour + ':' + minute + ':' + second
        var d = date.getFullYear() + '-' + month + '-' + currentDate
        if (d === '1-01-01') return ''
        return d
      }
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

