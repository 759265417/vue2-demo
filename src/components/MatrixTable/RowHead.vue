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
    createHead() {
      const [tr] = [[]];

      this.edit.resetNewRowHead.forEach((x) => {
        const cell = [];
        x.forEach((y) => {
          if (y && y !== null) {
            const height = y.rowSpan * this.edit.tableTdHeight;
            cell.push(
              <th
                colspan={y.colSpan}
                rowspan={y.rowSpan}
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
      return tr;
    },
  },
};
</script>
