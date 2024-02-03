<template>
  <div style="background-color: rgb(218, 228, 243);padding:0 32px;">
    <!-- 建议顶部和底部，高度写成px固定  假设顶部高度为a，底部高度为b-->
    <div id="player" style="height:100px;width:100%">
      <!-- 调成自己合适的尺寸-->
      <div style="width:70%">
        <audio controls="controls" ref='audio' style=" width: 90%; margin:10px 30px;">

        </audio>
      </div>
      <div>
        <el-button id="form-button" type="primary" @click="submit">Submit</el-button>
        <el-button type="primary" @click="quit">Quit</el-button>
      </div>
    </div>
    <!-- 32px为左右间距各32px-->
    <div style="margin:10px 0;padding:0 32px;">


      <!-- 假设顶部高度为a，底部高度为b ，此处150px为a+b-->
      <el-scrollbar id="exam" style="height:calc(100vh - 170px);width:100%">
        <form id="form-box">
          <div v-for="paper in paperList">
            <div v-html="format(paper)">
            </div>
          </div>
        </form>
      </el-scrollbar>
    </div>
    <el-footer style=" width: 100%; height: 50px;background: rbg(218, 228, 243);"></el-footer>
  </div>
</template>

<script>
import { ielts } from '../../api/index';
export default {
  data() {
    return {
      paperList: [],
      answerList: {},
      request: {
        paperId: 1,
        idolId: 1
      }
    }
  },
  created() {
    this.request.paperId = this.$route.query.paperId
    this.request.idolId = this.$route.query.idolId

    ielts.getPaperDeatail(this.$route.query.paperId)
      .then(
        res => {
          this.paperList = res.data
          this.paperList.forEach(paper => {
            var key = paper.questionId + '-' + paper.questionType + '-input'
            if (!(key in this.answerList)) {
              this.answerList[key] = [];
            }
            for (var i = 0; i < paper.rightAnswer.length; i++) {
              this.answerList[key].push(paper.rightAnswer[i]);
            }
            // 将值添加到对应的数组中
          })
        })
  },
  mounted() {

    this.submit()

    ielts.getVoice(this.request)
      .then(res => {
        this.$refs.audio.src = res.data
      })
  },
  methods: {
    format(data) {
      if (data.questionType == 1) {
        var replacedContent = data.stem
        var inputCount = 1
        for (var i = 0; i < data.answerList.length; i++) {
          var inputName = data.questionId + '-' + data.questionType + '-input'
          var item = data.answerList[i];
          var inputElement = '<input type="radio" name="' + inputName + '" value="' + item.answerValue + '" />'
          var answer = '<div>' + inputElement + item.answer + '</div><br/>'
          replacedContent = replacedContent + answer
          inputCount++;
        }
        return replacedContent
      }
      if (data.questionType == 0) {
        var replacedContent = data.stem
        var inputCount = 1
        for (var i = 0; i < data.answerList.length; i++) {
          var inputName = data.questionId + '-' + data.questionType + '-input'
          var item = data.answerList[i];
          var inputElement = '<input type="checkbox" name="' + inputName + '" value="' + item.answerValue + '" />'
          var answer = '<div>' + inputElement + item.answer + '</div>'
          replacedContent = replacedContent + answer
          inputCount++;
        }
        return replacedContent
      }
      if (data.questionType == 2) {
        var inputCount = 1
        var replacedContent = data.stem.replace(/{{response}}/g, function () {
          var inputName = data.questionId + '-' + data.questionType + '-input'
          var inputElement = '<input type="text" name="' + inputName + '">';
          inputCount++;
          return inputElement;
        });
        return replacedContent
      }
    },
    submit() {

      //  1.监听表单的提交事件 
      $('#form-button').on('click', (e) => {
        e.preventDefault()                  // 2.阻止表单的默认行为
        var formdata = $('#form-box').serialize()
        var data = {}            // 3. 快速获取表单中的数据
        // 按照 & 分割每个键值对
        const pairs = formdata.split('&');
        // 遍历每个键值对
        pairs.forEach(pair => {
          // 按照 = 分割键和值
          const [key, value] = pair.split('=');
          // 检查键是否已存在，如果不存在则创建一个新的数组
          if (!(key in data)) {
            //单选多选填空各自对应一个key 
            data[key] = [];
          }
          // 将值添加到对应的数组中
          data[key].push(decodeURIComponent(value));
        });
        // 总得分 
        var score = 0;
        //如果单选多选题 不选 formdata是拿不到任何值的 所以要补充空题
        Object.keys(this.answerList).forEach(key => {
          if (!(key in data)) {
            //单选多选填空各自对应一个key 
            data[key] = [];
          } else {
            var answersheet = data[key]
            const regex = /(?<=-)\d+/;
            var type = key.match(regex);
            var rightAnswer = this.answerList[key]
            //如果是单选题 或者 多选题 
            if (type != 2) {
              for (var i = 0; i < answersheet.length; i++) {
                if (rightAnswer.indexOf(answersheet[i]) > -1) {
                  score++;
                }
              }
            } else {
              //如果是填空题 因为空有多个填法 需要拆开判断
              for (var i = 0; i < answersheet.length; i++) {
                var answerSplit = rightAnswer[i]
                if (answerSplit.indexOf(';') > -1) {
                  answerSplit = answerSplit.split(';')
                  if (answerSplit.indexOf(answersheet[i]) > -1) {
                    score++;
                  }
                } else if (answerSplit === answersheet[i]) {
                  score++;
                }
              }
            }
          }

        })
        //实际答题
        this.$store.commit("setAnswerList", this.answerList)
        this.$store.commit("setActualAnswer", data)
        this.$router.push({ name: 'score', query: { score: score } })
      })

    },
    quit() {
      const vm = this;
      vm.$router.push({ name: 'kieltsView' })
    }
  }
}
</script>

<style>
#exam {
  /* margin-left: 100px; */
  /* margin-right: 100px; */
  border-width: 10px;
  border-style: solid;
  border-color: transparent;
  background-color: rgb(228, 234, 235);
  border-radius: 10px;
}

#player {
  width: 100%;
  align-items: center;
  background-color: rgb(218, 228, 243);
  display: flex;
}
</style>