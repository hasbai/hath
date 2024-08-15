<template>
  <dialog v-show="bus.show" id="toast" :class="bus.atTop ? 'toast-top toast-center' : 'right-4'"
          class="toast bg-transparent" popover
  >
    <div :class="bus.type" class="alert text-base-100">
      <Icon v-if="bus.type === MsgType.Info" name="mdi:info"></Icon>
      <Icon v-else-if="bus.type === MsgType.Success" name="mdi:success"></Icon>
      <Icon v-else-if="bus.type === MsgType.Warning" name="mdi:warning"></Icon>
      <Icon v-else name="mdi:error"></Icon>
      <span>{{ bus.message }}</span>
    </div>
  </dialog>
</template>

<script lang="ts" setup>
import {MsgType} from "@/utils/store";

const bus = useToast()
</script>

<style>
.toast {
  max-width: 90vw;
  white-space: normal;
  width: max-content;
}

.alert { /* fix tailwind alert display */
  display: flex;
}

.alert svg {
  flex-shrink: 0;
}
</style>