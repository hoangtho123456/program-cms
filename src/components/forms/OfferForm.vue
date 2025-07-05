<template>
  <v-form
    ref="formRef"
    @submit.prevent="onSubmit"
  >
    <div class="white px-4 pt-4 pb-5 rounded-md">
      <v-row>
        <v-col cols="12" md="4">
          <label class="d-block label-important mb-2">
            Code
          </label>
          <v-text-field
            v-model="mainForm.code"
            :rules="[...emptyRules]"
            hide-details="auto"
            outlined dense
          />
        </v-col>

        <v-col cols="12" md="4">
          <label class="d-block label-important mb-2">
            {{ $t('common.postTitle') }}
          </label>
          <v-text-field
            v-model="mainForm.postTitle"
            :rules="[...emptyRules]"
            hide-details="auto"
            outlined dense
          />
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
          <div class="d-block label-default mb-2">
            {{ $t('program.columns.format') }}
          </div>
          <v-text-field
            v-model="mainForm.format"
            hide-details="auto"
            outlined dense
          />
        </v-col>

        <v-col cols="12" md="4">
          <div class="label-default mb-2">
            {{ $t('common.description') }}
          </div>
          <v-textarea
            v-model="mainForm.description"
            rows="6"
            hide-details="auto"
            outlined
            dense
          ></v-textarea>
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
  code: '',
  postTitle: '',
  companyName: '',
  format: '',
  email: '',
  description: ''
};

export default {
  name: "CandidateForm",
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
  watch: {
    form: {
      handler (val) {
        this.mainForm = {
          ...this.mainForm,
          ...val
        };
        console.log('this.mainForm', val)
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
