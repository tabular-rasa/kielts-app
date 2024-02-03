<template>
  <div>
    <div>
      <el-row>
        <el-button id="ielts-box" v-for="ieltsOrder in ieltsList" @click="showTests(ieltsOrder)"> 剑{{ ieltsOrder
        }}</el-button>
        <el-button id="ielts-box"> 施工中... </el-button>
      </el-row>
    </div>
    <div id="test">
      <el-table :data="test.paperDTOS" v-for="test in testsList" style="width: 100%">

        <el-table-column prop="partNum" :label="test.ieltsName" width="180">
          <template v-slot="scope">
            Part {{ scope.row.partNum }}
          </template>
        </el-table-column>
        <el-table-column prop="paperType" label="题目类型" width="180" />
        <el-table-column label="练习答题">
          <template v-slot="scope">
            <el-button color="rgba(167, 218, 245, 1)" @click="btnClick(scope.row)" round>练习</el-button>
          </template>
        </el-table-column>
        <el-table-column label="支持爱豆声线">
          <template v-slot="scope">
            <div class="block">
              <el-button id="idol-img" type="primary" v-for="(val, index) in scope.row.idolDTOS"
                @click="handleClick(item)" circle>
                <el-avatar :src="val.idolImg" />
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog v-model="dialogVisible" title="选择你的爱豆声线" width="30%">
      <div style="height: 100px;">
        <el-button color="rgba(167, 218, 245, 1)" id="idol-img" v-for="idol in idolList" type="primary"
          :class="radio == item ? 'yes' : ''" @click="handleClick(idol.idolId)" circle>
          <el-avatar :src="idol.idolImg" />
        </el-button>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="goExam()">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { ielts } from '../../api/index';

export default {
  data() {
    return {
      ieltsList: [],
      testsList: [],
      idolList: [],
      dialogVisible: false,
      paperId: 1,
      idolId: 0,
      radio: 1,//选中是1
      item: 0//选择状态度量 item=0 没选 item=1 选了
    }
  },

  mounted() {
    ielts
      .getIeltsTable()
      .then(
        res => {
          this.ieltsList = res.data
        })
  },

  methods: {

    btnClick(data) {
      if (data.idolDTOS.length == 0) {
        this.$message.error('暂未开放，敬请期待')
      } else {
        this.dialogVisible = true
        this.paperId = data.paperId
        this.showIdols(data.paperId)
      }
    },
    showTests(data) {
      ielts.getTestsTable(data)
        .then(
          res => {
            this.testsList = res.data
          })
    },
    goExam() {
      if (this.idolId == 0) {
        this.$message.error('您尚未选择爱豆声线')
      } else {
        this.dialogVisible = false,
          this.$router.push({ name: 'ieltsExam', query: { paperId: this.paperId, idolId: this.idolId } })
      }

    },
    handleClick(data) {
      if (this.item == 1) {
        this.item = 0
        this.idolId = 0
      } else {
        this.idolId = data
        this.item = 1
      }
    },
    showIdols(data) {
      ielts.getAvailableIdol(data)
        .then(
          res => {
            this.idolList = res.data
          }
        )
    }
  },
}
</script>

<style scoped>
#ielts-box {
  display: inline-block;
  /* 将按钮显示为行内块元素 */
  margin: 5px;
  /* 按钮之间的间距 */
}

#idol-img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  float: left;
}

* {
  font-family: "fangzheng";
  text-align: center;
  transition: all .3s;
  font-size: 20px;
}

el-dialog {

  border-radius: 50%;
}

.yes {
  background: #409eff;
  color: white;
}
</style>
