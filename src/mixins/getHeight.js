const getHeightPX = {
  data() {
    return {
      contentStyleObj: {
        height: "",
      },
    };
  },
  created() {
    window.addEventListener("resize", this.getHeight);
    this.getHeight();
  },
  destroyed() {
    window.removeEventListener("resize", this.getHeight);
  },
  methods: {
    getHeight() {
      this.contentStyleObj.height = window.innerHeight - 110 + "px";
    },
  },
};
export default getHeightPX;
