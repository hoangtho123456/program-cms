<template>
  <v-form
    ref="formRef"
    @submit.prevent="onSubmit"
  >
    <div class="white px-4 pt-4 pb-5 rounded-md">
      <v-row>
        <v-col cols="12">
          <div class="d-flex gap-5 pr-5" style="max-width: 600px;">
            <div class="flex-shrink-1 flex-grow-1">
              <label class="d-block label-important mb-2">
                {{ $t('common.email') }}
              </label>
              <v-text-field
                v-model="mainForm.email"
                :rules="[...emptyRules, ...maxLength255Rules]"
                hide-details="auto"
                outlined dense
              />
            </div>

            <div>
              <label class="d-block label-default mb-1">
                {{ $t('common.logo') + ` (${imageSize.w}px x ${imageSize.h}px)` }}
              </label>
              <IconUpload
                :key="`iconUploadKey_${keyCount}`"
                class="icon-input d-inline-block"
                :value="mainForm.image"
                :width="imageSize.w"
                :height="imageSize.h"
                :iconSize="20"
                filledColor="transparent"
                imageTypeAfterCropped="png"
                cropper
                @onCropped="changeImage($event)"
                @onDeleted="changeImage($event)"
              />
            </div>
          </div>
        </v-col>

        <v-col cols="12" md="4">
          <label class="d-block label-important mb-2">
            {{ $t('common.email') }}
          </label>
          <v-text-field
            v-model="mainForm.email"
            :rules="[...emptyRules, ...emailRules]"
            hide-details="auto"
            outlined dense
          />
        </v-col>

        <v-col cols="12" md="4">
          <label class="d-block label-important mb-2">
            {{ $t('common.telephone') }}
          </label>
          <InputTelephone
            v-model="mainForm.phone"
            :key="`phoneInput_${keyCount}`"
          />
        </v-col>
        
        <v-col cols="12" md="4">
          <div class="label-important mb-2">
            {{ $t('common.firstName') }}
          </div>
          <v-text-field
            v-model="mainForm.firstName"
            :rules="emptyRules"
            outlined
            dense
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <div class="label-important mb-2">
            {{ $t('common.lastName') }}
          </div>
          <v-text-field
            v-model="mainForm.lastName"
            :rules="emptyRules"
            outlined
            dense
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <div class="label-default mb-2">
            {{ $t('common.message') }}
          </div>
          <v-textarea
            v-model="mainForm.message"
            rows="4"
            hide-details="auto"
            outlined
            dense
          />
        </v-col>
      </v-row>
    </div>

    <div class="mt-4 flex justify-center">
      <BtnSubmit :loading="loading" @click="onSubmit" />
    </div>
  </v-form>
</template>
<script>
import BtnSubmit from '@/components/BtnSubmit.vue';
import IconUpload from '@/components/FileUpload/Image.vue';
import InputTelephone from '@/components/InputTelephone.vue';

const INIT_FORM = {
  email: '',
  image: null,
  firstName: '',
  lastName: '',
  phone: '',
  message: ''
};

export default {
  name: "OfferForm",
  components: {
    BtnSubmit,
    IconUpload,
    InputTelephone
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    form: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    mainForm: structuredClone(INIT_FORM),
    keyCount: 0
  }),
  computed: {
    imageSize () {
      return {
        w: 100,
        h: 100
      }
    }
  },
  watch: {
    form: {
      handler (val) {
        this.mainForm = {
          ...this.mainForm,
          ...val
        };
        this.keyCount++;
      },
      immediate: true
    }
  },
  methods: {
    scrollToErrorEl () {
      const el = this.$refs.formRef?.$el.querySelector('.v-input.error--text');
      if (el) {
        document.querySelector('.form-main')?.scrollTo({ top: el.offsetTop - 50, behavior: 'smooth' });
      }
    },
    changeImage (file) {
      this.mainForm.image = file;
    },
    onSubmit () {
      if (!this.$refs.formRef?.validate()) {
        this.$nextTick(() => {
          this.scrollToErrorEl();
        });

        return false;
      }

      const form = {};
      for (const key of Object.keys(INIT_FORM)) {
        form[key] = this.mainForm[key];
      }
      if (this.mainForm) form.id = this.mainForm.id;
      console.log(form)
      this.$emit('onSubmit', form);
    }
  }
};
</script>
<style lang="scss" scoped>
::v-deep {
  .icon-input {
    .v-btn {
      border-radius: 10px!important;
    }
  }
}
</style>
