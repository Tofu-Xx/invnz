function vowel2phonemes(vowel: string | string[], phonemes: string) {
  return {
    vowel,
    phonemes: phonemes.split('_'),
  }
}

export const vowel2phonemesMap = [
  vowel2phonemes(['uai', 'wai'], 'u_ai'),
  vowel2phonemes(['ia', 'ya'], 'i_a'),
  vowel2phonemes(['ua', 'wa'], 'u_a'),
  vowel2phonemes(['iao', 'yao'], 'i_ao'),
  vowel2phonemes(['iu', 'you'], 'i_ou'),
  vowel2phonemes(['ui', 'wei'], 'u_ei'),
  vowel2phonemes(['ing', 'ying'], 'i_eng'),
  vowel2phonemes(['in', 'yin'], 'i_en'),
  vowel2phonemes(['un', 'wen'], 'u_en'),
  vowel2phonemes('weng', 'u_eng'),
  vowel2phonemes(['ün', 'yun'], 'v_en'),
  vowel2phonemes(['ian', 'yan'], 'ie_an'),
  vowel2phonemes(['iang', 'yang'], 'i_ang'),
  vowel2phonemes(['uan', 'wan'], 'u_an'),
  vowel2phonemes(['uang', 'wang'], 'u_ang'),
  vowel2phonemes(['üan', 'yuan'], 've_an'),
] as const
