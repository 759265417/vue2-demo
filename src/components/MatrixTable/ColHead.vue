<script type="text/jsx">
// 创建表格头部
export default {
  data() {
    return {};
  },
  watch: {},
  components: {},

  inject: ["edit"],
  render(h) {
    const tr = this.createHead(h);
    return (
      <table class="editTable__block" id="tb">
        <thead>{tr}</thead>
      </table>
    );
  },
  props: {
    allRow: {
      type: Boolean,
      defaule: false,
    },
  },
  methods: {
    sync(prop, value) {
      this[prop] = value;
    },
    createHead() {
      const [tr] = [[]];
      //左上角部分
      if (this.edit.rowData && this.edit.rowData.length > 0) {
        const rowspan = this.edit.allHeadRow.length;
        const colspan = this.edit.allColHeadRow.length;
        for (let i = 0; i < rowspan; i++) {
          if (i === 0) {
            const width = colspan * this.edit.headColWidth;
            const height = rowspan * this.edit.tableTdHeight;
            const cell = (
              <th
                colspan={colspan}
                rowspan={rowspan}
                style={{ width: width + "px", height: height + "px" }}
              >
                {" "}
              </th>
            );
            tr.push(<tr>{cell}</tr>);
          } else {
            tr.push(<tr></tr>);
          }
        }
      }

      // //左下角部分；
      if (this.allRow) {
        this.edit.resetNewColHead.forEach((x) => {
          const cell = [];
          x.forEach((y) => {
            if (y && y !== null) {
              const height = y.colSpan * this.edit.tableTdHeight;
              cell.push(
                <th
                  colspan={y.rowSpan}
                  rowspan={y.colSpan}
                  style={{
                    width: this.edit.headColWidth + "px",
                    height: height + "px",
                    textAlign: this.edit.textAlign,
                  }}
                >
                  {y.name}
                </th>
              );
            }
          });
          tr.push(<tr>{cell}</tr>);
        });
      }
      console.log("colheadmethods");
      return tr;
    },
  },
};
</script>
<style lang="scss"></style>
