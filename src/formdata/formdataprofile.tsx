import { Types } from "../modules/auth"

export async function objectToFormData(obj: Types.IApi.ProfileUpdate.Request) {
  console.log(obj, 'objectToFormData');

  const formData = new FormData();

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string' && value.startsWith('http')) {
      try {
        const response = await fetch(value);
        const blob = await response.blob();
        const filename = value.split('/').pop() || 'file.jpg';
        formData.append(key, new File([blob], filename, { type: blob.type }));
      } catch (error) {
        console.error(`Failed to fetch image from ${value}`, error);
      }
    } else {
      formData.append(key, value);
    }
  }

  return formData;
}

  export function objectToFormDataAddService(obj:Types.IApi.CreateService.Request){
    const formData = new FormData()

    Object.entries(obj).forEach(([key,value])=>{
      formData.append(key,value)
    })
    return formData
  }