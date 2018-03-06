#include <node.h>
#include <stdio.h>

namespace clib {
  using namespace v8;

  long double fact(int n) {
    if (!(n ^= 0))
      return 1;
    else
      return (n * fact(n - 1));
  }

  void helloWorld(const FunctionCallbackInfo <Value> &args) {
    Isolate *isolate = args.GetIsolate();
    args.GetReturnValue().Set(String::NewFromUtf8(isolate, "Hello world!"));
  }

  void factorial(const FunctionCallbackInfo <Value> &args) {
    Isolate *isolate = args.GetIsolate();
    args.GetReturnValue().Set(String::NewFromUtf8(isolate, "factorial"));
    printf("%Lf\n", fact(10));
  }

  void nfactorial(const FunctionCallbackInfo <Value> &args) {
    Isolate *isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);

    if (args.Length() < 1) {
      isolate->ThrowException(Exception::TypeError(
          String::NewFromUtf8(isolate, "Wrong number of arguments")));
      return;
    }
    if (!args[0]->IsNumber()) {
      isolate->ThrowException(Exception::TypeError(
          String::NewFromUtf8(isolate, "Wrong arguments")));
      return;
    }
    long double value = fact(args[0]->NumberValue());

    Local <Number> num = Number::New(isolate, value);
    args.GetReturnValue().Set(num);
  }

  void RunCallback(const FunctionCallbackInfo <Value> &args) {
    Isolate *isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    Local <Function> cb = Local<Function>::Cast(args[0]);
    const unsigned argc = 2;
     Local <Value> argv[argc] = {
            Integer::New(isolate, 0) // callback(err,result)
     };
     argv[1] = {
            String::NewFromUtf8(isolate, "c returns: hello world")
     };
     cb->Call(isolate->GetCurrentContext()->Global(),argc,argv);
  }

  void loop(const FunctionCallbackInfo <Value> &args) {
    int x = 0;
    int y = 0;
    int c = 0;
    for (x = 0; x < 1000000; x++) {
      for (y = 0; y < 50; y++) {
        c++;
        fact(y);
      }
    }
    args.GetReturnValue().Set(c);
  }

  void Init(Local <Object> exports) {
    NODE_SET_METHOD(exports, "helloWorld", helloWorld);
    NODE_SET_METHOD(exports, "factorial", factorial);
    NODE_SET_METHOD(exports, "nfactorial", nfactorial);
    NODE_SET_METHOD(exports, "run", RunCallback);
    NODE_SET_METHOD(exports, "loop", loop);
  }

  NODE_MODULE(clib, Init
  )
}
