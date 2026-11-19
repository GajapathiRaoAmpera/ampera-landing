// WebGL2 on a real GPU. Software renderers (SwiftShader, llvmpipe) draw on the CPU and
// block the main thread, so those devices get the static fallback instead of the 3D scene.
export function hasWebGL() {
  try {
    const gl = document.createElement("canvas").getContext("webgl2");
    if (!gl) return false;
    const info = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : "";
    gl.getExtension("WEBGL_lose_context")?.loseContext(); // free the probe context
    return !/swiftshader|llvmpipe|software/i.test(renderer);
  } catch {
    return false;
  }
}
