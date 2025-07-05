<template>
  <v-dialog v-model="dialog" persistent max-width="400">
    <v-card>
      <v-card-title class="headline"> {{ title }} </v-card-title>
      <vue-cropper
        class="vue-cropper-wrap"
        :class="{ 'vue-cropper-circle': circle }"
        ref="cropper"
        :src="file"
        alt="Source Image"
        :aspect-ratio="aspectRatio"
        :crop-box-resizable="false"
        :auto-crop-area="1"
      >
      </vue-cropper>
      <div class="actionInputCrop">
        <v-btn-toggle borderless class="group-action-btn">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                @click="$refs.cropper.relativeZoom(0.2)"
              >
                <v-icon>fas fa-plus</v-icon>
              </v-btn>
            </template>
            <span>Zoom In</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                @click="$refs.cropper.relativeZoom(-0.2)"
              >
                <v-icon>fas fa-minus</v-icon>
              </v-btn>
            </template>
            <span>Zoom Out</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                @click="$refs.cropper.rotate(-45)"
              >
                <v-icon>fas fa-rotate-left</v-icon>
              </v-btn>
            </template>
            <span>Rotate -45</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" @click="$refs.cropper.rotate(45)">
                <v-icon>fas fa-rotate-right</v-icon>
              </v-btn>
            </template>
            <span>Rotate +45</span>
          </v-tooltip>
        </v-btn-toggle>
      </div>
      <v-card-actions class="inputCardAction">
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="dialog = false">
          {{ $t("common.cancel") }}
        </v-btn>
        <v-btn color="primary" @click="onCropped">
          {{ $t("common.confirm") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "AvatarUploader",
  props: {
    title: {
      type: String,
      default: "Upload Image",
    },
    file: {},
    aspectRatio: {
      type: Number,
      default: 1, // square
    },
    circle: {
      type: Boolean,
      default: false,
    },
    minWidth: {
      type: Number,
      default: 0,
    },
    minHeight: {
      type: Number,
      default: 0,
    },
    filledColor: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      dialog: false,
      cropped: null,
    };
  },
  computed: {
    bgColor () { return '#fff'; }
  },
  watch: {
    file(val) {
      this.$nextTick(() => {
        // rebuild cropperjs with the updated source
        this.$refs.cropper.replace(val);
      });
    },
  },
  methods: {
    open(on) {
      this.dialog = on ? true : false;
    },
    onCropped() {
      this.dialog = false;
      let output = this.$refs.cropper
        .getCroppedCanvas({
          fillColor: this.filledColor || this.bgColor,
          minWidth: this.minWidth,
          minHeight: this.minHeight,
        })
        .toDataURL();
      this.$emit("cropped", output);
    },
  },
};
</script>
<style lang="scss">
//fix for cropper
.vue-cropper-wrap {
  max-height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
  > img {
    display: block;
  }

  &.vue-cropper-circle {
    .cropper-crop-box,
    .cropper-view-box {
      border-radius: 50%;
    }
    .cropper-view-box {
      box-shadow: 0 0 0 1px #39f;
      outline: 0;
    }
    .cropper-face {
      background-color: inherit !important;
    }

    .cropper-dashed,
    .cropper-line {
      display: none !important;
    }
    .cropper-view-box {
      outline: inherit !important;
    }

    .cropper-point.point-se {
      top: calc(85% + 1px);
      right: 14%;
    }
    .cropper-point.point-sw {
      top: calc(85% + 1px);
      left: 14%;
    }
    .cropper-point.point-nw {
      top: calc(15% - 5px);
      left: 14%;
    }
    .cropper-point.point-ne {
      top: calc(15% - 5px);
      right: 14%;
    }
    .cropper-crop-box,
    .cropper-view-box {
      border-radius: 50%;
    }

    .cropper-view-box {
      box-shadow: 0 0 0 1px #39f;
      outline: 0;
    }

    .cropper-face {
      background-color: inherit !important;
    }

    .cropper-dashed,
    .cropper-point.point-se,
    .cropper-point.point-sw,
    .cropper-point.point-nw,
    .cropper-point.point-ne,
    .cropper-line {
      display: none !important;
    }

    .cropper-view-box {
      outline: inherit !important;
    }
  }
}
.cropper-container {
  overflow: hidden;
  .cropper-wrap-box {
    background: #555;
  }
}
.actionInputCrop {
  display: flex;
  justify-content: center;
  .group-action-btn {
    flex-direction: row !important;
  }
}
@media all and (max-width: 768px) {
  .inputCardAction {
    justify-content: center;
    .spacer {
      display: none !important;
    }
  }
}
</style>
