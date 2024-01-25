<template>
  <div>
    <div style="margin-top: 60px;">
      <el-row>
        <el-button id="ielts-box" v-for="ieltsOrder in ieltsList"> 剑{{ ieltsOrder }}</el-button>
        <el-button id="ielts-box"> 施工中... </el-button>
      </el-row>
    </div>
    <div id="test" style="margin-left: 20px;">
      <el-table :data="test.paperDTOS" v-for="test in testsList" style="width: 100%">
        <el-table-column prop="partNum" :label="test.ieltsName" width="180">
          <template v-slot="scope">
            Part {{ scope.row.partNum }}
          </template>
        </el-table-column>
        <el-table-column prop="paperType" label="题目类型" width="180" />
        <el-table-column prop="address" label="练习答题">
          <el-button type="success" round>练习</el-button>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { ielts } from '../../api/index';

export default {
  data() {
    return {
      ieltsList: [],
      testsList: [],
    }
  },

  mounted() {
    ielts
      .getIeltsTable()
      .then(
        res => {
          this.ieltsList = res.data
          console.log(this.ieltsList)
        })
    ielts.getTestsTable(18)
      .then(
        res => {
          this.testsList = res.data
          console.log(this.testsList)
        })

  },

  methods: {

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
</style>
